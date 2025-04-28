const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying Staking Contract with account: ${deployer.address}`);

  const tokenAddress = "0x6746892382466aF4ba465c5Ff3F6379A92Fa922c"; // token TTT
  const masterchefV2Address = "0x80155a8BD80036f21e515df8952Fec3FeE66e6C7"; // Địa chỉ Farm
  const adminAddress = "0xD883d78895ea55071a4B9e9583A1a13e09b07DA8";
  const treasuryAddress = "0xD883d78895ea55071a4B9e9583A1a13e09b07DA8"; // Cùng admin
  const operatorAddress = "0xD883d78895ea55071a4B9e9583A1a13e09b07DA8"; // Cùng admin
  const pid = 1;

  // Deploy contract Staking
  const StakingContract = await ethers.getContractFactory("testDEXPool");
  const staking = await StakingContract.deploy(
    tokenAddress,
    masterchefV2Address,
    adminAddress,
    treasuryAddress,
    operatorAddress,
    pid, 
  );

  await staking.deployed();
  console.log(`✅ Staking Contract deployed at: ${staking.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  //   npx hardhat run scripts/deploytestDEXStake.js --network RiseChain