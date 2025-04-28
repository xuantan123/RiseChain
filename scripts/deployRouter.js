const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(); 
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const factory = "0xC4E5b6f7e5cd88455d2DA4acfC2d4C6206f9C92C";
  const WA0GIAddress = "0x701855ae3a8b2A989DC8ACCf02Dd2b96f8B21671"; 

  const testDEXSwapRouter = await hre.ethers.getContractFactory("testDEXSwapRouter");
  const router = await testDEXSwapRouter.deploy(factory, WA0GIAddress);
  await router.deployed();
  console.log("Router deployed at:", router.address);

  const testDEXToken = await hre.ethers.getContractFactory("testDEXworld");
  const token = await testDEXToken.deploy(deployer.address);
  await token.deployed();
  console.log("Token deployed at:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // npx hardhat run scripts/deployRouter.js --network RiseChain