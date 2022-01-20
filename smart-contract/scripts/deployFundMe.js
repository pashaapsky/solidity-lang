const hre = require("hardhat");
const ethers = hre.ethers;

const DECIMALS = 8;
const STARTING_PRICE = "200000000000";

const main = async () => {
  const FundMe = await hre.ethers.getContractFactory("FundMe");
  const MockV3Aggregator = await hre.ethers.getContractFactory(
    "MockV3Aggregator"
  );

  const [owner] = await ethers.getSigners();
  console.log('owner.address: ', owner.address);

  let priceFeedAddress;

  //добавляем адресс агрегатора в конструктор контракта fundMe
  //для localhost - делаем Mock аггрегатора
  //для тестовых сетей - берем адресс контракта из config hardhat
  if (hre.network.name !== "localhost") {
    priceFeedAddress = hre.config.networks[hre.network.name].ethUsdPriceFeed;
  } else {
    console.log(`Active network is: ${hre.network.name}`);
    console.log("Deploy mocks contracts for localhost!");
    const mockV3Aggregator = await MockV3Aggregator.deploy(
      DECIMALS,
      STARTING_PRICE
    );
    await mockV3Aggregator.deployed();

    priceFeedAddress = mockV3Aggregator.address;
    console.log("mockV3Aggregator deployed to:", mockV3Aggregator.address);
    console.log("mocks deployed");
  }

  const fundMe = await FundMe.deploy(priceFeedAddress);

  await fundMe.deployed();

  console.log("FundMe deployed to:", fundMe.address);
  const entranceFee = await fundMe.getEntranceFee();
  console.log('The current entrance fee is: ', entranceFee);
  console.log('Funding...');
  const fundRes = await fundMe.fund({ value: entranceFee });
  console.log('End Funding... ', fundRes);
  console.log('Start withDraw...');
  const withdrawRes = await fundMe.withdraw();
  console.log('End WithDrawRes', withdrawRes);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
