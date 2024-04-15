const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token", () => {
    it("Should return the right name", async () => {
        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy();
        const name = await token.name();
        expect(name).to.equal("JUST Token");
    });
});