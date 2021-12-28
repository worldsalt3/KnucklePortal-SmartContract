const main = async () => {
    // const [deployer] = await hre.ethers.getSigners();
    // const accountBalance = await deployer.getBalance();

    // console.log("Deploying contracts with the account: ", deployer.address);
    // console.log("Account balance: ", accountBalance.toString());

    // const Token = await hre.ethers.getContractFactory("KnucklePortal");
    // const portal = await Token.deploy({
    //     value: hre.ethers.utils.parseEther("0.001")
    // });
    // await portal.deployed();

    // console.log("KnucklePortal address: ", portal.address);

    const knuckleContractFactory = await hre.ethers.getContractFactory(
      'KnucklePortal'
    )
    const knuckleContract = await knuckleContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.001'),
    })
    await knuckleContract.deployed()

    console.log('Contract addy: ', knuckleContract.address)
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();