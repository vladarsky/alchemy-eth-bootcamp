import { ethers } from "ethers";
import LotteryABI from '../../frontend/artifacts/contracts/Lottery.sol/Lottery.json'; // Assuming ABI is exported as JSON

// Example data - replace with actual values
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
    // Configuring the provider
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Adjust your provider URL

    // Connecting to the contract
    const contract = new ethers.Contract(contractAddress, LotteryABI.abi, provider);

    try {
        const owner = await contract.owner();
        console.log(`Owner: ${owner}`);

        const participants = await contract.getParticipants();
        console.log(`Participants: ${participants}`);

        const participantsCount = await contract.getParticipantsCount();
        console.log(`Participants Count: ${participantsCount}`);

        // Fetch each participant
        for (let i = 0; i < participantsCount; i++) {
            const participant = await contract.participants(i);
            console.log(`Participant ${i}: ${participant}`);
        }

    } catch (error) {
        console.error("Failed to fetch contract variables:", error);
    }
}

main().catch(console.error);
