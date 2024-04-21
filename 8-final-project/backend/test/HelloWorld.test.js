const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HelloWorld", function () {
    let HelloWorld;
    let helloWorld;
    let owner;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        HelloWorld = await ethers.getContractFactory("HelloWorld");
        [owner] = await ethers.getSigners();

        // Deploy a new HelloWorld contract before each test.
        helloWorld = await HelloWorld.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await helloWorld.signer.getAddress()).to.equal(owner.address);
        });

        it("Should return the initial greeting", async function () {
            expect(await helloWorld.getGreeting()).to.equal("Hello, World!");
        });
    });

    describe("setGreeting", function () {
        it("Should change the greeting when new greeting is set", async function () {
            const newGreeting = "Hello, Hardhat!";
            await helloWorld.setGreeting(newGreeting);
            expect(await helloWorld.getGreeting()).to.equal(newGreeting);
        });
    });
});