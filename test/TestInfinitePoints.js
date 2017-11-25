var InfinitePoint = artifacts.require("./InfinitePoints.sol")

contract('InfinitePoints', (accounts) => {

  it("...should add and retrieve points properly.", async () => {
    const infinitePointInstance = await InfinitePoint.deployed();

    await infinitePointInstance.signup("Lazada", accounts[0], true, 2, "lzd", "lzd", {from: accounts[0]})
    await infinitePointInstance.signup("Tiki", accounts[1], true, 3, "tiki", "tiki", {from: accounts[0]})
    await infinitePointInstance.signup("Ninh", accounts[2], false, 0, "", "", {from: accounts[0]})
    await infinitePointInstance.signup("Trung", accounts[3], false, 0, "", "", {from: accounts[0]})

    const [name, rate, isMerchant] = await infinitePointInstance.getAccountInfo({from: accounts[0]})
    assert.equal(rate.c[0], 2, "Get Lazada info")
    assert.equal(isMerchant, true, "Get Lazada info")
    assert.equal(web3.toUtf8(name), "Lazada", "Get Lazada info")

    await infinitePointInstance.addPoints(accounts[2], 100, {from: accounts[0]})
    let point = await infinitePointInstance.getMerchantPoints (accounts[0], accounts[2])
    assert.equal(point[1].c[0], 100, "Ninh has 100 Lazada Point")

    let merchants = await infinitePointInstance.getMerchants({from: accounts[2]})
    assert.equal(merchants, accounts[0], "Ninh has Lazada loyalty progam")

    await infinitePointInstance.addPoints(accounts[2], 50, {from: accounts[0]})
    point = await infinitePointInstance.getMerchantPoints (accounts[0], accounts[2])
    assert.equal(point[1].c[0], 150, "Ninh has total 150 Lazada point")

    merchants = await infinitePointInstance.getMerchants ({from: accounts[2]})
    assert.equal(merchants, accounts[0], "Ninh still only join Lazada program")

    await infinitePointInstance.addPoints(accounts[3], 200, {from: accounts[1]})
    point = await infinitePointInstance.getMerchantPoints (accounts[1], accounts[3])
    assert.equal(point[1].c[0], 200, "Trung has 200 Tiki point")
    
    merchants = await infinitePointInstance.getMerchants ({from: accounts[3]})
    assert.equal(merchants, `${accounts[1]}`, "Get Trung's loyalty program")

    await infinitePointInstance.addPoints(accounts[3], 300, {from: accounts[0]})
    point = await infinitePointInstance.getMerchantPoints (accounts[0], accounts[3])
    assert.equal(point[1].c[0], 300, "Trung got 300 Lazada point")

    let ninhWCoin = await infinitePointInstance.getWCoin(accounts[0], {from: accounts[2]})
    let trungWCoin1 = await infinitePointInstance.getWCoin(accounts[0], {from: accounts[3]})
    let trungWcoin2 = await infinitePointInstance.getWCoin(accounts[1], {from: accounts[3]})
    assert.equal(ninhWCoin.c[0], 300, "Ninh has 150 lzd point -> 300 wcoin")
    assert.equal(trungWCoin1.c[0], 600, "Trung has 300 lzd point -> 600 wcoin")
    assert.equal(trungWcoin2.c[0], 600, "Trung has 200 tiki point -> 600 wcoin")

    // create offer
    await infinitePointInstance.createOffer("unique_id_01", "sell", accounts[1], accounts[0], 100, {from: accounts[3]})
    
    // before transfer
    let nlzdWCoinBft = await infinitePointInstance.getWCoin(accounts[0], {from: accounts[2]})
    let tlzdWCoinBft = await infinitePointInstance.getWCoin(accounts[0], {from: accounts[3]})
    let ttikWCoinBft = await infinitePointInstance.getWCoin(accounts[1], {from: accounts[3]})
    assert(nlzdWCoinBft.c[0], 300, "Ninh has lzd point relevance to 300 wcoin")
    assert(tlzdWCoinBft.c[0], 600, "Trung has lzd point relevance to 600 wcoin")
    assert(ttikWCoinBft.c[0], 600, "Trung has tiki point relevance to 600 wcoin")
    
    // transfer 100 tiki point to get 150 Lazada point
    await infinitePointInstance.exchangePointToPoint("unique_id_01", {from: accounts[2]})

    // after transfer
    let nlzdWCoinAft = await infinitePointInstance.getWCoin(accounts[0], {from: accounts[2]})
    let tlzdWCoinAft = await infinitePointInstance.getWCoin(accounts[0], {from: accounts[3]})
    let ttikWCoinAft = await infinitePointInstance.getWCoin(accounts[1], {from: accounts[3]})
    console.log("After Ninh has lzd point", nlzdWCoinAft.c[0])
    console.log("After Trung has lzd point", tlzdWCoinAft.c[0])
    console.log("After Trung has tiki point", ttikWCoinAft.c[0])
  })
})
