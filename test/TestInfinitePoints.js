var InfinitePoint = artifacts.require("./InfinitePoints.sol")

contract('InfinitePoints', (accounts) => {

  it("...should add and retrieve points properly.", async () => {
    const infinitePointInstance = await InfinitePoint.deployed();

    await infinitePointInstance.signup("Merchant1", accounts[0], true, 2, {from: accounts[0]})
    await infinitePointInstance.signup("Merchant2", accounts[2], true, 3, {from: accounts[0]})
    await infinitePointInstance.signup("Customer", accounts[1], false, 0, {from: accounts[0]})

    const [name, rate, isMerchant] = await infinitePointInstance.getAccountInfo({from: accounts[2]})
    assert.equal(rate.c[0], 3, "Get merchant info")
    assert.equal(isMerchant, true, "Get merchant info")
    assert.equal(web3.toUtf8(name), "Merchant2", "Get merchant info")

    await infinitePointInstance.addPoints(accounts[1], 100, {from: accounts[0]})
    let point = await infinitePointInstance.getPoints (accounts[0], accounts[1])
    assert.equal(point.c[0], 100, "Get first point")

    let mechants = await infinitePointInstance.getMerchants ({from: accounts[1]})
    assert.equal(mechants, accounts[0], "Get first merchants")

    await infinitePointInstance.addPoints(accounts[1], 50, {from: accounts[0]})
    point = await infinitePointInstance.getPoints (accounts[0], accounts[1])
    assert.equal(point.c[0], 150, "Get first point")

    mechants = await infinitePointInstance.getMerchants ({from: accounts[1]})
    assert.equal(mechants, accounts[0], "Get first merchants")

    await infinitePointInstance.addPoints(accounts[1], 200, {from: accounts[2]})
    point = await infinitePointInstance.getPoints (accounts[2], accounts[1])
    assert.equal(point.c[0], 200, "Get second point")
    mechants = await infinitePointInstance.getMerchants ({from: accounts[1]})
    assert.equal(mechants, `${accounts[0]},${accounts[2]}`, "Get all merchants")

    let amount = await infinitePointInstance.getExchangeRate(accounts[0], accounts[2], 500)
    assert.equal(amount.c[0], 333, "Exchange 500 from 1 => 2")
    amount = await infinitePointInstance.getExchangeRate(accounts[2], accounts[0], 500)
    assert.equal(amount.c[0], 750, "Exchange 500 from 1 => 2")
  })
})
