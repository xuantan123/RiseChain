const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  
  // Địa chỉ hợp đồng đã triển khai
  const contractAddress = "địa_chỉ_hợp_đồng_của_bạn";
  const LiPage = await ethers.getContractFactory("LiPage");
  const liPage = await LiPage.attach(contractAddress);
  
  // Mint NFT với tokenId mới
  const tokenId = 2; // Thay đổi tokenId
  const amount = 1;
  const recipient = deployer.address;
  
  console.log(`Minting ${amount} của token ID ${tokenId} cho ${recipient}`);
  await liPage.mint(recipient, tokenId, amount);
  console.log("NFT minted successfully!");
  
  // Kiểm tra số dư
  const balance = await liPage.balanceOf(recipient, tokenId);
  console.log(`Số dư của tokenId ${tokenId} cho ${recipient}: ${balance.toString()}`);
  
  // Kiểm tra tổng cung
  const totalSupply = await liPage.totalSupply(tokenId);
  console.log(`Tổng cung của tokenId ${tokenId}: ${totalSupply.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 