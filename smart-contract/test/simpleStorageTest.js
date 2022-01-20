const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage deploy", function () {
  it("Проверяет deploy контракта", async function () {
    const SimpleStorageContract = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorageContract.deploy();
    await simpleStorage.deployed();

    expect(await simpleStorage.retrieve()).to.equal(0);
  });
});

describe("SimpleStorage update", function () {
  it("Проверяет update контракта", async function () {
    const SimpleStorageContract = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorageContract.deploy();
    await simpleStorage.deployed();

    const transaction = await simpleStorage.store(15);
    await transaction.wait();

    expect(await simpleStorage.retrieve()).to.equal(15);
  });
});
