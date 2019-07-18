const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {abi,bytecode} = require('./compile')

const mnemonic = 'they among attend next vital music legal sketch author flower judge fiscal'
// 真实测试网络
// let provider = new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/d7ceb0287d484e679c9766662d462b44");
// 本地ganache网络
let provider = new HDWalletProvider(mnemonic, "http://localhost:7545");
const OPTIONS = {
    defaultBlock :"latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
}
const web3 = new Web3(provider,null,OPTIONS);
deploy = async ()=>{
    const accounts = await web3.eth.getAccounts()
    // 0x7db224a7dBb3Dc73aeb3e874168889037Bd22C87
    console.log("部署账户："+accounts[0])
    const res = await new web3.eth.Contract(abi).deploy({
        data:'0x'+bytecode//必须使用0x开头，否则无限消耗gas
    }).send({
        from:accounts[0],
        gas:'3000000'
    })
    console.log("部署成功！")
    console.log("合约地址："+res.options.address)
}
deploy()