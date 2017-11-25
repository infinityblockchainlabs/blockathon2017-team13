# blockathon2017-team13
=============

# Getting Started``

### How to deploy on local
1. Modify `truffle.js`
```
module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: '*' // Match any network id
    }
  }
};
```
2. Start local testrpc: `testrpc`
3. Conpile and migrate
```
truffle compile
truffle migrate
```
4. Start server: `yarn start`

### How to deploy on ropsten network
1. Modify `truffle.js`
```
module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: 3, // Match ropsten network id
      from: '0xa5de5c83b03c2465705934f902f4f5c0768dde1b', // base ethereum address to deploy this contract
      gas: 2900000 // gas limit
    }
  }
};
```
2. Start local testrpc
```
geth --testnet --rpc --rpcaddr="localhost" --rpcport="8545" --rpccorsdomain="http://localhost:3000" --rpcapi admin,eth,net,web3,personal
```
Then wait until the blockchain is fully synced. Use `geth attach http://localhost:8545` to check the status
3. Conpile and migrate
```
truffle compile
truffle migrate
```
4. Start server: `yarn start`
