const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token", () => {
    const name = 'JUST Token';
    const symbol = 'JUST';
    const decimals = 18;
    const totalSupply = ethers.utils.parseUnits('1000000', 18);

    let token, deployer, receiver;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("JUST Token", "JUST", 1000000);
        let accounts = await ethers.getSigners();
        deployer = accounts[0];
        receiver = accounts[1];
    })

    describe("Deployment", () => {
        it("Should return the right name", async () => {
            expect(await token.name()).to.equal(name);
        });
    
        it("Should return the right symbol", async () => {
            expect(await token.symbol()).to.equal(symbol);
        });
    
        it("Should return the right decimals", async () => {
            expect(await token.decimals()).to.equal(decimals);
        });
    
        it("Should return the right totalSupply", async () => {
            expect(await token.totalSupply()).to.equal(totalSupply);
        });
    
        it("assigns total supply to deployer", async () => {
            expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
        })
    })

    describe('Transfer', () => {
        let amount, transaction, result;

        it('Transfers token balances', async () => {
            amount = ethers.utils.parseUnits('100', 18);
            transaction = await token.connect(deployer).transfer(receiver.address, amount);
            result = transaction.wait();

            expect(await token.balanceOf(deployer.address)).to.equal(totalSupply.sub(amount));
            expect(await token.balanceOf(receiver.address)).to.equal(amount);
        })

        it('Emits Transfer event', async () => {
            amount = ethers.utils.parseUnits('100', 18);
            transaction = await token.connect(deployer).transfer(receiver.address, amount);
            result = transaction.wait();
            expect(result).to.emit(token, 'Transfer').withArgs(deployer.address, receiver.address, amount);
        })

        it('Throws error if insufficient balance', async () => {
            amount = ethers.utils.parseUnits('1000001', 18);
            await expect(token.connect(deployer).transfer(receiver.address, amount)).to.be.revertedWith('Insufficient balance');
        })
    })
});