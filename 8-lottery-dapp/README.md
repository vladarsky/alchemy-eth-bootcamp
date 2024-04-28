1. use node 20 (you can enter "nvm use" in directory)
2. run "npm i" in backend and frontend directories
3. run "npm run build" in backend
4. run "npm run node" in backend
5. run "npm run deploy-local" in backend + enter received address to frontend .env as VITE_LOTTERY_ADDRESS
6. run "npm run dev" in frontend
7. Go to http://localhost:5173/
8. Take private key from hardhat node, import it and participate in lottery!
9. Run "npm run pick-winner" once you are ready to finish lottery
10. To run tests run 'npm run test' in backend