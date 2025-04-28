const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // 📌 Lấy danh sách các contract đã deploy
    const deployments = await ethers.getSigners();
    const deployer = deployments[0];

    console.log("🚀 Đang lấy địa chỉ contract với tài khoản:", deployer.address);

    // 🏭 Lấy contract t0GDEXCall
    const testDEXFactory = await ethers.getContractFactory("testDEXFactory");

    // ⚡ Triển khai contract (hoặc lấy từ file cấu hình nếu đã deploy trước đó)
    const factory = await testDEXFactory.deploy(deployer.address);
    await factory.deployed();

    console.log("✅ Địa chỉ testDEXFactory:", factory.address);
}

// 🚀 Chạy script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Lỗi:", error.message);
        process.exit(1);
    });


// npx hardhat run scripts/gettestDEXFactory.js --network RiseChain