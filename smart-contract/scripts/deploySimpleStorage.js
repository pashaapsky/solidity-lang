const hre = require("hardhat");

const main = async () => {
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  //в аргументы добавляем адресс контракта тестовой сети - для работы на localhost
  const simpleStorage = await SimpleStorage.deploy(
    "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"
  );

  await simpleStorage.deployed();

  console.log("SimpleStorage deployed to:", simpleStorage.address);
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
