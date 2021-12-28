const main = async () => {
    const knuckleContractFactory = await hre.ethers.getContractFactory("KnucklePortal");
    const knuckleContract = await knuckleContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.01'),
    });
    await knuckleContract.deployed();

    console.log("Contract addy: ", knuckleContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(knuckleContract.address);
    console.log(
      'Contract balance: ',
      hre.ethers.utils.formatEther(contractBalance)
    );

    const knuckleTxn = await knuckleContract.knuckle("This is wave #1");
    await knuckleTxn.wait();    

    let knuckleCount;
    knuckleCount = await knuckleContract.getTotalKnuckles();
    console.log(knuckleCount.toNumber());

    // let knuckleTxn = await knuckleContract.knuckle("A message!");
    // await knuckleTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(knuckleContract.address);
    console.log(
      'Contract balance: ',
      hre.ethers.utils.formatEther(contractBalance)
    )

    // const [_, randomPerson] = await hre.ethers.getSigners();
    // knuckleTxn = await knuckleContract.connect(randomPerson).knuckle('Another message');
    // await knuckleTxn.wait();
    

    let allKnuckles = await knuckleContract.getAllKnuckles();
    console.log(allKnuckles);
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