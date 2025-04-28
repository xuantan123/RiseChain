async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);
  
    const balance = await deployer.getBalance();
    console.log("Account balance:", ethers.utils.formatEther(balance), "A0GI");
  
    const Multicall = await ethers.getContractFactory("Multicall");
    const multicall = await Multicall.deploy();
  
    await multicall.deployed();
    console.log("Multicall deployed to:", multicall.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  

// npx hardhat run scripts/deployMulticall.js --network RiseChain