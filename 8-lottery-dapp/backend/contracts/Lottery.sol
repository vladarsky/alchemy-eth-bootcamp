// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import the console.sol library from Hardhat for debugging
import "hardhat/console.sol";

contract Lottery {
    address payable[] public participants;
    address public owner;

    // Event declaration
    event Entered(address indexed participant);

    constructor() {
        owner = msg.sender;
    }

    function enter() public payable {
        require(msg.value == 1 ether, "Entry fee is exactly 1 ETH");
        participants.push(payable(msg.sender));

        // Emitting the event
        emit Entered(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp, participants.length)));
    }

    function pickWinner() public {
        require(msg.sender == owner, "Only the owner can pick a winner");
        require(participants.length > 0, "No participants entered");

        uint index = random() % participants.length;
        participants[index].transfer(address(this).balance);

        // Correctly reset the lottery for the next round
        delete participants; // Proper way to clear the array
    }

    function getParticipantsCount() public view returns (uint) {
        return participants.length;
    }

    function getParticipants() public view returns (address[] memory) {
        address[] memory temp = new address[](participants.length);
        for (uint i = 0; i < participants.length; i++) {
            temp[i] = address(participants[i]);
        }
        return temp;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
