const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://testnet.riselabs.xyz");

async function checkRPC() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log("RPC hoạt động bình thường ✅ Block:", blockNumber);
  } catch (error) {
    console.error("RPC lỗi ❌", error);
  }
}

checkRPC();
