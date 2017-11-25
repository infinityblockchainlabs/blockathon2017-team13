pragma solidity ^0.4.9;
import "./utils/strings.sol";

contract InfinitePoints {
    using strings for *;

    address owner;

    mapping(address => mapping (address => uint256)) points;
    mapping(address => address[]) merchants;

    struct Account {
      bytes32 name;
      bool isMerchant;
      uint256 rate;
    }

    mapping (address => Account) private accounts;

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

    function signup(bytes32 name, address eth, bool isMerchant, uint256 rate) returns (address) {
        require(!isMerchant || msg.sender == owner);
        require(!isMerchant || rate >= 1);

        if (accounts[eth].name == 0x0) {
            accounts[eth].name = name;
            accounts[eth].isMerchant = isMerchant;
            if (isMerchant) {
                accounts[eth].rate = rate;
            }
            return (eth);
        }

        return (eth);
    }

    function getAccountInfo () constant public returns (bytes32, uint256, bool) {
        Account acc = accounts[msg.sender];
        return (acc.name, acc.rate, acc.isMerchant);
    }

    function addPoints (address customer, uint256 point) public {
        require(accounts[msg.sender].isMerchant);
        require(point > 0);
        require(accounts[customer].name != 0x0);
        require(!accounts[customer].isMerchant);

        if (points[msg.sender][customer] == 0) {
            merchants[customer].push(msg.sender);
        }
        points[msg.sender][customer] += point;
    }

    function getPoints (address merchant, address customer) constant public returns (uint256) {
        return points[merchant][customer];
    }

    function getMerchants () constant public returns (string) {
        string memory merchantList = "";
        for (uint i = 0; i < merchants[msg.sender].length; ++i) {
            if (i > 0) merchantList = concat(merchantList, ",");
            merchantList = concat(merchantList, toString(merchants[msg.sender][i]));
        }
        return merchantList;
    }

    function getExchangeRate (address from, address to, uint256 amount) constant public returns (uint256) {
        require(accounts[from].isMerchant);
        require(accounts[to].isMerchant);
        require(amount > 0);

        return amount * accounts[from].rate / accounts[to].rate;
    }

    function exchange (address from, address to, uint256 amount) public {
        require(points[from][msg.sender] >= amount);
        require(accounts[to].isMerchant);
        require(amount > 0);

        if (points[to][msg.sender] == 0) {
            merchants[msg.sender].push(to);
        }
        if (points[from][msg.sender] == amount) {
          for (uint i = 0; i < merchants[msg.sender].length; i++) {
              if (from == merchants[msg.sender][i]) {
                  delete merchants[msg.sender][i];
                  break;
              }
          }
        }

        amount = getExchangeRate(from, to, amount);
        points[from][msg.sender] -= amount;
        points[to][msg.sender] += amount;
    }
}