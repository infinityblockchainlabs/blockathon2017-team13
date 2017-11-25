module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "www.blockathon.asia",
      port: 8545,
      network_id: '*',
      from: '0x2adb22ce0a570fea5827f71631810f8bed89b5bd', // base ethereum address to deploy this contract
      gas: 5000000 // gas limit
    }
  }
};
