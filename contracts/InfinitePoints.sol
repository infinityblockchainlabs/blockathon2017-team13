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
      address creator;
      address from;
      address to;
      uint256 amount;
      bytes32 typ;
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

    function getAccountInfo () constant public returns (bytes32, uint256, bool, string, string, uint256) {
        Account acc = accounts[msg.sender];
        return (acc.name, acc.rate, acc.isMerchant, acc.code, acc.url, wcoins[msg.sender]);
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

    function getWCoin (address merchant) constant public returns (uint256) {
        require(points[merchant][msg.sender] > 0);
        uint256 rate = accounts[merchant].rate;
        return points[merchant][msg.sender] * rate;
    }

    function exchangePointToWCoin (address merchant, uint256 amount) public {
        require(isMerchant(merchant)); // 
        require(!isMerchant(msg.sender)); // only customer can exchange points to wcoins
        require(points[merchant][msg.sender] > 0);
        require(amount > 0);

        uint256 rate = accounts[merchant].rate;

        points[merchant][msg.sender] -= amount;
        wcoins[msg.sender] += amount * rate;
    }

    function exchangeWCoinToPoint (address merchant, uint256 amount) public {
        require(isMerchant(merchant)); // 
        require(!isMerchant(msg.sender)); // only customer can exchange wcoins to points
        require(points[merchant][msg.sender] > 0);
        require(amount > 0);

        uint256 rate = accounts[merchant].rate;

        wcoins[msg.sender] -= amount;
        points[merchant][msg.sender] += amount / rate;
    }

    function isMerchant (address id) constant internal returns (bool) {
        return accounts[id].isMerchant;
    }

    function createOffer (string offerId, bytes32 typ, address from, address to, uint256 amount) public {
        require(typ == "buy" || typ == "sell");
        Offer memory offer;
        offer.typ = typ;
        offer.from = from;
        offer.to = to;
        offer.amount = amount;
        offer.creator = msg.sender;
        offers[offerId] = offer;
        offerList.push(offerId);
    }

    function getOffer (string offerId) constant public returns (bytes32, string, string, uint256, string, string, uint256, uint256) {
      Offer offer = offers[offerId];
      Account creator = accounts[offer.creator];
      Account from = accounts[offer.from];
      Account to = accounts[offer.to];
      return (creator.name, concat("", from.code), concat("", to.code), offer.amount, concat(from.url, ""), concat("", to.url),
        offer.amount * accounts[offer.from].rate, offer.amount * accounts[offer.to].rate
      );
    }

    function getOfferIds (bytes32 typ) constant public returns (string) {
        string memory offerIds = "";
        for (uint i = 0; i < offerList.length; ++i) {
            Offer offer = offers[offerList[i]];
            if (offer.typ == typ) {
                if (offerIds.toSlice().len() > 0) offerIds = concat(offerIds, ",");
                offerIds = concat(offerIds, offerList[i]);
            }
        }
        return offerIds;
    }

    function exchangePointToPoint (string offerId) public {
        require(offers[offerId].typ == "buy" || offers[offerId].typ == "sell");
        Offer memory offer = offers[offerId];

        if (offer.typ == "sell") { // sender buy
            exchangeP2P(offer.from, offer.to, offer.creator, msg.sender, offer.amount);
        } else { // sender sell
            exchangeP2P(offer.to, offer.from, msg.sender, offer.creator, offer.amount);
        }

        delete offers[offerId];
    }

    function exchangeP2P(address merchantA, address merchantB, address from, address to, uint256 amount) public {
        uint256 toAmount = amount * accounts[merchantB].rate / accounts[merchantA].rate;
        require(points[merchantA][from] >= amount);
        require(points[merchantB][to] >= toAmount);

        // add list merchant to [to] if not exist
        if (points[merchantB][to] == 0) {
            merchants[to].push(merchantB);
        }
        // remove if [from] tranfer all amount to [to]
        if (points[merchantA][from] == amount) {
            for (uint i = 0; i < merchants[from].length; i++) {
                if (merchantA == merchants[from][i]) {
                    delete merchants[from][i];
                    break;
                }
            }
        }

        // change amount of [from] and [to]
        points[merchantA][from] -= amount;
        points[merchantB][from] += toAmount;
        points[merchantA][to] += amount;
        points[merchantB][to] -= toAmount;
    }

    function convertPoint(string offerId) public {
        require(offers[offerId].typ == "buy" || offers[offerId].typ == "sell");
        Offer memory offer = offers[offerId];

        if (offer.typ == "sell") { // sender buy
            exchangeWCoinToPoint(offer.to, offer.amount);
        } else { // sender sell
            exchangePointToWCoin(offer.from, offer.amount);
        }

        delete offers[offerId];
    }

    function getWCoinBalance() constant public returns (uint256) {
        return wcoins[msg.sender];
    }
}
