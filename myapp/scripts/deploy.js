const {ethers} = require("hardhat");

async function main() {
 
  const contract = await ethers.getContractFactory("MyNft");
  const MyContract = await contract.deploy();

  await MyContract.deployed();

  console.log("NFT Contract is Deployed to:", MyContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  //NFT Contract is Deployed to: 0xb8d8340B6823D67F115b6ab0A620770FE37cF51E  
  //  0x54433b6Fa742798AC1C8ac163DfE903FbfA542f4