pragma solidity ^0.4.9;
import "./utils/strings.sol";

contract InfinitePoints {
    using strings for *;

    address owner;

    // mapping (merchant => mapping (customer => points))
    mapping(address => mapping (address => uint256)) points;
    // mapping (customer => merchants[])
    mapping(address => address[]) merchants;
    // mapping (customer => wcoin)
    mapping(address => uint256) wcoins;

    struct Account {
      bytes32 name;
      bool isMerchant;
      uint256 rate;
      string code;
      string url;
    }
    mapping (address => Account) private accounts;

    struct Offer {
      address seller;
      address buyer;
      address from;
      address to;
      uint256 amount;
      bytes32 typ;
      bool sold;
    }

    mapping (string => Offer) offers;
    string[] offerList;

    function InfinitePoints () {
        owner = msg.sender;
    }

    function concat (string s1, string s2) internal returns (string) {
        return s1.toSlice().concat(s2.toSlice());
    }

    function char(byte b) returns (byte c) {
        if (b < 10) return byte(uint8(b) + 0x30);
        else return byte(uint8(b) + 0x57);
    }

    function toString(address x) returns (string) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            byte b = byte(uint8(uint(x) / (2 ** (8 * (19 - i)))));
            byte hi = byte(uint8(b) / 16);
            byte lo = byte(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return concat("0x", string(s));
    }

    function signup(bytes32 name, address eth, bool isMerchant, uint256 rate, string code, string url) returns (address) {
        require(!isMerchant || rate >= 1);

        if (accounts[eth].name == 0x0) {
            accounts[eth].name = name;
            accounts[eth].isMerchant = isMerchant;
            if (isMerchant) {
                accounts[eth].rate = rate;
                accounts[eth].code = code;
                accounts[eth].url = url;
            }
            return (eth);
        }

        return (eth);
    }

    function getAccountInfo () constant public returns (bytes32, uint256, bool, string, string) {
        Account acc = accounts[msg.sender];
        return (acc.name, acc.rate, acc.isMerchant, acc.code, acc.url);
    }

    function addPoints (address customer, uint256 point) public {
        require(isMerchant(msg.sender));
        require(!isMerchant(customer));
        require(point > 0);
        require(accounts[customer].name != 0x0);
        require(!accounts[customer].isMerchant);

        if (points[msg.sender][customer] == 0) {
            merchants[customer].push(msg.sender);
        }
        points[msg.sender][customer] += point;
    }

    function subPoints (address customer, uint256 point) public {
        require(isMerchant(msg.sender));
        require(!isMerchant(customer));
        require(point > 0);
        require(points[msg.sender][customer] >= point);

        points[msg.sender][customer] -= point;
    }
    
    function getMerchantPoints (address merchant, address customer) constant public returns (bytes32, uint256) {
        return (accounts[merchant].name, points[merchant][customer]);
    }

    function getMerchants () constant public returns (string) {
        string memory merchantList = "";
        for (uint i = 0; i < merchants[msg.sender].length; ++i) {
            if (i > 0) merchantList = concat(merchantList, ",");
            merchantList = concat(merchantList, toString(merchants[msg.sender][i]));
        }
        return merchantList;
    }

    function exchangePoints(address merchantFrom, address merchantTo, address to, uint256 amount) public {
        require(points[merchantFrom][msg.sender] >= amount);
        require(isMerchant(merchantTo));
        require(isMerchant(merchantFrom));
        require(amount > 0);

        if (points[merchantTo][msg.sender] == 0) {
            merchants[msg.sender].push(merchantTo);
        }
        if (points[merchantFrom][msg.sender] == amount) {
          for (uint i = 0; i < merchants[msg.sender].length; i++) {
              if (merchantFrom == merchants[msg.sender][i]) {
                  delete merchants[msg.sender][i];
                  break;
              }
          }
        }

        amount = getExchangeRate(merchantFrom, merchantTo, amount);
        points[merchantFrom][msg.sender] -= amount;
        points[merchantTo][msg.sender] += amount;
    }

    function getExchangeRate (address merchantFrom, address merchantTo, uint256 amount) constant public returns (uint256) {
        require(isMerchant(merchantFrom));
        require(isMerchant(merchantTo));
        require(amount > 0);

        return amount * accounts[merchantFrom].rate / accounts[merchantTo].rate;
    }

    function getWCoin (address merchant) constant public returns (uint256) {
        require(points[merchant][msg.sender] > 0);
        uint256 rate = accounts[merchant].rate;
        return points[merchant][msg.sender] * rate;
    }

    function pointsToWCoin (address merchant, uint256 amount) public {
        require(isMerchant(merchant)); // 
        require(!isMerchant(msg.sender)); // only customer can exchange points to wcoin
        require(points[merchant][msg.sender] > 0);
        require(amount > 0);

        uint256 rate = accounts[merchant].rate;

        points[merchant][msg.sender] -= amount;
        wcoins[msg.sender] += amount * rate;
    }

    function wcoinsToPoint (address merchant, uint256 amount) public {
        require(isMerchant(merchant)); // 
        require(!isMerchant(msg.sender)); // only customer can exchange points to wcoin
        require(points[merchant][msg.sender] > 0);
        require(amount > 0);

        uint256 rate = accounts[merchant].rate;

        wcoins[msg.sender] -= amount;
        points[merchant][msg.sender] += amount / rate;
    }

    function isMerchant (address id) constant internal returns (bool) {
        return accounts[id].isMerchant;
    }

    function setOffer (string offerId, bytes32 typ, address from, address to, uint256 amount) public {
      require(typ == "buy" || typ == "sell");
      Offer offer;
      offer.typ = typ;
      offer.from = from;
      offer.to = to;
      offer.amount = amount;
      if(typ == "buy") {
          offer.seller = msg.sender;
      } else {
          offer.buyer = msg.sender;
      }
      offers[offerId] = offer;
      offerList.push(offerId);
    }

    function getOffer (string offerId) constant public returns (string, string, string, string, uint256, bool) {
      Offer offer = offers[offerId];
      return (toString(offer.seller), toString(offer.buyer), toString(offer.from), toString(offer.to), offer.amount, offer.sold);
    }

    function getOfferIds () public returns (string) {
        string memory offerIds = "";
        for (uint i = 0; i <offerList.length; ++i) {
            if(!offers[offerList[i]].sold) {
                if (i > 0) offerIds = concat(offerIds, ",");
                offerIds = concat(offerIds, offerList[i]);
            }
        }
        return offerIds;
    }
}
