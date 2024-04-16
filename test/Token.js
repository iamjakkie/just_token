const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token", () => {
    const name = 'JUST Token';
    const symbol = 'JUST';
    const decimals = 18;
    const totalSupply = ethers.utils.parseUnits('1000000', 18);

    let token;
    let deployer;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("JUST Token", "JUST", 1000000);
        let accounts = await ethers.getSigners();
        deployer = accounts[0].address;
    })

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
        expect(await token.balanceOf(deployer)).to.equal(totalSupply);
    })
});