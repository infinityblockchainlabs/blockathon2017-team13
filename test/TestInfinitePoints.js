var InfinitePoint = artifacts.require("./InfinitePoints.sol")

contract('InfinitePoints', (accounts) => {

  it("...should add and retrieve points properly.", async () => {
    const infinitePointInstance = await InfinitePoint.deployed();

    await infinitePointInstance.signup("Merchant1", accounts[0], true, 2, {from: accounts[0]})
    await infinitePointInstance.signup("Merchant2", accounts[2], true, 3, {from: accounts[0]})
    await infinitePointInstance.signup("Customer1", accounts[1], false, 0, {from: accounts[0]})
    await infinitePointInstance.signup("Customer2", accounts[3], false, 0, {from: accounts[0]})

    const [name, rate, isMerchant] = await infinitePointInstance.getAccountInfo({from: accounts[2]})
    assert.equal(rate.c[0], 3, "Get merchant info")
    assert.equal(isMerchant, true, "Get merchant info")
    assert.equal(web3.toUtf8(name), "Merchant2", "Get merchant info")

    await infinitePointInstance.addPoints(accounts[1], 100, {from: accounts[0]})
    let point = await infinitePointInstance.getMerchantPoints (accounts[0], accounts[1])
    assert.equal(point[1].c[0], 100, "Get first point")

    let merchants = await infinitePointInstance.getMerchants({from: accounts[1]})
    assert.equal(merchants, accounts[0], "Get first merchants")

    await infinitePointInstance.addPoints(accounts[1], 50, {from: accounts[0]})
    point = await infinitePointInstance.getMerchantPoints (accounts[0], accounts[1])
    assert.equal(point[1].c[0], 150, "Get first point")

    merchants = await infinitePointInstance.getMerchants ({from: accounts[1]})
    assert.equal(merchants, accounts[0], "Get first merchants")

    await infinitePointInstance.addPoints(accounts[1], 200, {from: accounts[2]})
    point = await infinitePointInstance.getMerchantPoints (accounts[2], accounts[1])
    assert.equal(point[1].c[0], 200, "Get second point")
    
    merchants = await infinitePointInstance.getMerchants ({from: accounts[1]})
    assert.equal(merchants, `${accounts[0]},${accounts[2]}`, "Get all merchants")

    await infinitePointInstance.addPoints(accounts[3], 200, {from: accounts[2]})
    point = await infinitePointInstance.getMerchantPoints (accounts[2], accounts[3])
    assert.equal(point[1].c[0], 200, "Get 3rd point")

    let wcoin1 = await infinitePointInstance.getWCoin(accounts[0], {from: accounts[1]})
    let wcoin2 = await infinitePointInstance.getWCoin(accounts[2], {from: accounts[3]})
    assert.equal(wcoin1.c[0], 300, "Get wcoin point")
    assert.equal(wcoin2.c[0], 600, "Get wcoin point")
    
    // await infinitePointInstance.exchangePoints(accounts[0], accounts[2], accounts[3], 100)
    // let wcoin1 = await infinitePointInstance.getWCoin(accounts[0], {from: accounts[1]})
    // let wcoin2 = await infinitePointInstance.getWCoin(accounts[2], {from: accounts[3]})

    // console.log(wcoin1)
    // console.log(wcoin2)
  })
})
