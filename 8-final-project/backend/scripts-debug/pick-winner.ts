import * as dotenv from 'dotenv';
dotenv.config();

import { ethers } from "ethers";
import LotteryABI from '../../frontend/artifacts/contracts/Lottery.sol/Lottery.json'; // Assuming ABI is exported as JSON

const contractAddress = process.env.CONTRACT_ADDRESS as string; // Replace with actual contract address
const privateKey = process.env.PRIVATE_KEY as string; // Owner's private key for demonstration; use environment variables in production
const providerURL = process.env.JSON_RPS_PROVIDER as string;

const provider = new ethers.providers.JsonRpcProvider(providerURL); // Adjust your provider URL
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
