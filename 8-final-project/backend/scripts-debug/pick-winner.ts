import { ethers } from "ethers";
import LotteryABI from '../../frontend/artifacts/contracts/Lottery.sol/Lottery.json'; // Assuming ABI is exported as JSON

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual contract address
const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Owner's private key for demonstration; use environment variables in production

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Adjust your provider URL
const signer = new ethers.Wallet(privateKey, provider);
const lotteryContract = new ethers.Contract(contractAddress, LotteryABI.abi, signer);

async function pickWinner() {
    console.log("Attempting to pick a winner...");
    try {
        const txResponse = await lotteryContract.pickWinner();
        const receipt = await txResponse.wait();
        console.log("Winner picked successfully:", receipt);
    } catch (error) {
        console.error("Failed to pick winner:", error);
    }
}

async function run() {
    await pickWinner();
}

run().catch(console.error);
