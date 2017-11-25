pragma solidity ^0.4.0;
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract CryptoLicenseToken is StandardToken, Ownable {

    string public name = 'CryptoLicenseToken';
    string public symbol = 'CTL';
    uint8 public decimals = 18;
    uint256 public totalSupply;
    uint256 public sellPrice;
    uint256 public buyPrice;

    function CryptoLicenseToken () {
        uint256 initialSupply = 200000;
        totalSupply = initialSupply * 10 ** uint256(decimals);
        balances[this] = totalSupply;
        setPrices(0.02 * 1000000000000000000, 0.03 * 1000000000000000000);
    }

    /**
     * Internal transfer, only can be called by this contract
     */
    function _transfer(address _from, address _to, uint _value) internal {
        // Prevent transfer to 0x0 address. Use burn() instead
        require(_to != 0x0);
        // Check if the sender has enough
        require(balances[_from] >= _value);
        // Check for overflows
        require(balances[_to] + _value > balances[_to]);
        // Save this for an assertion in the future
        uint previousBalances = balances[_from] + balances[_to];
        // Subtract from the sender
        balances[_from] -= _value;
        // Add the same to the recipient
        balances[_to] += _value;
        Transfer(_from, _to, _value);
        // Asserts are used to use static analysis to find bugs in your code. They should never fail
        assert(balances[_from] + balances[_to] == previousBalances);
    }

    /// @notice Allow users to buy tokens for `newBuyPrice` eth and sell tokens for `newSellPrice` eth
    /// @param newSellPrice Price the users can sell to the contract
    /// @param newBuyPrice Price users can buy from the contract
    function setPrices(uint256 newSellPrice, uint256 newBuyPrice) onlyOwner public {
        sellPrice = newSellPrice;
        buyPrice = newBuyPrice;
    }

    function getPrices() constant public returns (uint256, uint256) {
        return (sellPrice, buyPrice);
    }

    /// @notice Buy tokens from contract by sending ether
    function buy() payable returns (uint am) {
        uint amount = msg.value / buyPrice;               // calculates the amount
        _transfer(this, msg.sender, amount);              // makes the transfers
        return amount;
    }

    /// @notice Sell `amount` tokens to contract
    /// @param amount amount of tokens to be sold
    function sell(uint256 amount) public {
        require(this.balance >= amount * sellPrice);      // checks if the contract has enough ether to buy
        _transfer(msg.sender, this, amount);              // makes the transfers
        msg.sender.transfer(amount * sellPrice);          // sends ether to the seller. It's important to do this last to avoid recursion attacks
    }

    function transferToken(address _to, uint amount) public {
        _transfer(msg.sender, _to, amount);
    }

    function getBalance() constant public returns (uint) {
        return balances[msg.sender];
    }

    function checkBalance(address member) onlyOwner public returns (uint) {
        return balances[member];
    }
}

