// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract KnucklePortal {

    uint256 totalKnuckles;

    uint256 private seed;

    event NewKnuckle(address indexed from, uint256 timestamp, string message);

    struct Knuckle {
        address knuckler;
        string message;
        uint256 timestamp;
    }


    Knuckle[] knuckles;

    mapping(address => uint256) public lastKnuckledAt;

    constructor() payable {
        console.log("Yo, Check out my first contract");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function knuckle(string memory _message) public {

        require(
            lastKnuckledAt[msg.sender] + 30 seconds < block.timestamp,
            "Must wait 30 seconds before waving again."
        );

        lastKnuckledAt[msg.sender] = block.timestamp;

        totalKnuckles += 1;
        console.log("%s knuckled w/ message %s", msg.sender, _message);

        knuckles.push(Knuckle(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        if (seed <= 50) {
            console.log("%s won!", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewKnuckle(msg.sender, block.timestamp, _message);

    }

    function getAllKnuckles() public view returns (Knuckle[] memory) {
        return knuckles;
    }

    function getTotalKnuckles() public view returns (uint256) {
        console.log("We have %d total knuckles!", totalKnuckles);
        return totalKnuckles;
    }
}