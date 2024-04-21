async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();

    console.log("Lottery deployed to:", lottery.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});