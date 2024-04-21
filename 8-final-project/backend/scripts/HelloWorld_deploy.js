async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();

    console.log("HelloWorld deployed to:", helloWorld.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});