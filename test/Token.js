const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token", () => {

    let token;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
    })


    it("Should return the right name", async () => {
        expect(await token.name()).to.equal("JUST Token");
    });

    it("Should return the right symbol", async () => {
        expect(await token.symbol()).to.equal("JUST");
    });

    it("Should return the right decimals", async () => {
        expect(await token.decimals()).to.equal(18);
    });

    it("Should return the right totalSupply", async () => {
        expect(await token.totalSupply()).to.equal('1000000000000000000000000');
    });
});