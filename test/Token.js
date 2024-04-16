const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token", () => {

    let token;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("JUST Token", "JUST", 1000000);
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
        const value = ethers.utils.parseUnits('1000000', 18);
        expect(await token.totalSupply()).to.equal(value);
    });
});