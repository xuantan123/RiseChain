const { ethers } = require("hardhat");

async function main() {
  // Lấy signer (tài khoản triển khai hợp đồng)
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Lấy contract factory cho hợp đồng LiPage
  const LiPage = await ethers.getContractFactory("LiPage");
  
  // Cài đặt các tham số để triển khai hợp đồng
  const name = "Snappy NFTs";
  const symbol = "SNAPPY";
  const baseURI = "https://plum-solid-ferret-699.mypinata.cloud/ipfs/bafkreigsdaxkq6c7mdvx3ojsqj5qu26laeeqyh37gm4gfhwhcd3heynzym";
  const royaltyAmount = 500; // 5% royalty (500 basis points)

  // Triển khai hợp đồng
  const liPage = await LiPage.deploy(
    deployer.address, // Chủ sở hữu ban đầu
    name,
    symbol,
    baseURI,
    royaltyAmount
  );

  // Chờ hợp đồng triển khai xong
  await liPage.deployed();
  console.log("LiPage deployed to:", liPage.address);

}

// Thực thi script
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { main };

// npx hardhat run scripts/deployMintNFTs.js --network RiseChain