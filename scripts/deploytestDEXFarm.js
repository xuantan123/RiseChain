const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying testDEXFarm contract...");

    const testDEXFarm = await ethers.getContractFactory("testDEXFarm");

    const CAKE_ADDRESS = "0x6746892382466aF4ba465c5Ff3F6379A92Fa922c"; //TTT (token)

    const BURN_ADMIN_ADDRESS = "0xD883d78895ea55071a4B9e9583A1a13e09b07DA8";  //wallet address admin

    const TestDEXFarm = await testDEXFarm.deploy(CAKE_ADDRESS, BURN_ADMIN_ADDRESS);
    await TestDEXFarm.deployed();

    console.log(`TestDexFarm deployed at: ${TestDEXFarm.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
// npx hardhat run scripts/deploytestDEXFarm.js --network RiseChain