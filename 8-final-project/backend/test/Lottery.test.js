const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
    let Lottery;
    let lottery;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        Lottery = await ethers.getContractFactory("Lottery");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        lottery = await Lottery.deploy();
    });

    describe("enter", function () {
        it("should allow entry with 1 ETH", async function () {
            await expect(lottery.connect(addr1).enter({ value: ethers.utils.parseEther("1") }))
                .to.emit(lottery, 'Entered')
                .withArgs(addr1.address);
            expect(await lottery.getParticipantsCount()).to.equal(1);
        });

        it("should reject entry with less or more than 1 ETH", async function () {
            await expect(lottery.connect(addr1).enter({ value: ethers.utils.parseEther("0.5") }))
                .to.be.revertedWith("Entry fee is exactly 1 ETH");
            await expect(lottery.connect(addr1).enter({ value: ethers.utils.parseEther("2") }))
                .to.be.revertedWith("Entry fee is exactly 1 ETH");
        });
    });

    describe("pickWinner", function () {
        it("should allow only owner to pick a winner", async function () {
            await lottery.connect(addr1).enter({ value: ethers.utils.parseEther("1") });
            await expect(lottery.connect(addr2).pickWinner())
                .to.be.revertedWith("Only the owner can pick a winner");
        });

        it("should pick a winner, transfer balance and reset participants", async function () {
            await lottery.connect(addr1).enter({ value: ethers.utils.parseEther("1") });
            await lottery.connect(addr2).enter({ value: ethers.utils.parseEther("1") });

            const initialBalance1 = await ethers.provider.getBalance(addr1.address);
            const initialBalance2 = await ethers.provider.getBalance(addr2.address);
            await lottery.pickWinner();
            const finalBalance1 = await ethers.provider.getBalance(addr1.address);
            const finalBalance2 = await ethers.provider.getBalance(addr2.address);

            expect(await lottery.getParticipantsCount()).to.equal(0);

            try {
                expect(finalBalance1).to.be.above(initialBalance1);
                console.log('first won!')
            } catch (error1) {
                // If the first test fails, then test the second condition
                expect(finalBalance2).to.be.above(initialBalance2);
                console.log('second won!')
            }
        });
    });
});
