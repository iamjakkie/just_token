pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "JUST Token";
    string public symbol = "JUST";
    uint16 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** decimals;
}