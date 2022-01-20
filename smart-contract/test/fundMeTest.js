const { expect, assert} = require("chai");
const hre = require("hardhat");
const ethers = hre.ethers;

const DECIMALS = 8;
const STARTING_PRICE = "200000000000";

describe("TEST FundMe contract", function () {
  it("Проверяет методы контракта", async function () {
    const FundMe = await hre.ethers.getContractFactory("FundMe");
    const MockV3Aggregator = await hre.ethers.getContractFactory(
      "MockV3Aggregator"
    );

    //получаем подключенные аккаунты
    const [owner] = await ethers.getSigners();

    let priceFeedAddress;

    if (hre.network.name !== "localhost") {
      priceFeedAddress = hre.config.networks[hre.network.name].ethUsdPriceFeed;
    } else {
      const mockV3Aggregator = await MockV3Aggregator.deploy(
        DECIMALS,
        STARTING_PRICE
      );
      await mockV3Aggregator.deployed();

      priceFeedAddress = mockV3Aggregator.address;
    }

    const fundMe = await FundMe.deploy(priceFeedAddress);

    await fundMe.deployed();

    const entranceFee = await fundMe.getEntranceFee();

    const tx = await fundMe.fund({ value: entranceFee });
    await tx.wait();

    expect(await fundMe.addressToAmountFunded(owner.address)).to.equal(
      entranceFee
    );

    const tx2 = await fundMe.withdraw();
    await tx2.wait();

    expect(await fundMe.addressToAmountFunded(owner.address)).to.equal(0);
  });
});

// describe("TEST FundMe contract", function () {
//   it("Только владелец может вызвать withdraw()?", async function () {
//     if (hre.network.name === "localhost" && hre.network.name === "hardhat") {
//       this.skip();
//     }
//
//     const [owner, addr1] = await ethers.getSigners();
//
//     const FundMe = await hre.ethers.getContractFactory("FundMe");
//     const fundMe = await FundMe.deploy(
//       hre.config.networks[hre.network.name].ethUsdPriceFeed
//     );
//
//     expect(await fundMe.withdraw({ from: addr1.address })).throw(new Error('Property does not exist in model schema.'));
//     // const tx = await fundMe.withdraw({ from: owner });
//   });
// });
