import Web3 from 'web3';
import HDWalletProvider from "truffle-hdwallet-provider"
// 先声明一个web3对象,显式声明其类型。
// let web3init;//本身没错，默认类型为any，会导致外部导入此模块时无法按照类型追踪，产生代码补全提示。
let web3init = new Web3()//有利于找出代码提示
// 判断当前浏览器是否已存在注入的web3对象，（有些浏览器插件如metaMask已经创建了web3对象，不要重复创建）


if (typeof window.web3 !== 'undefined') {
    console.log("Injected web3 found!");
    let web3Provider;
    // 判断授权
    let judeAccess = async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            web3Provider = window.ethereum
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }// Legacy dapp browsers...
        else if (window.web3) {
            web3Provider = window.web3.currentProvider
        }
    }
    judeAccess()
    web3init = new Web3(web3Provider)
} else {
    console.log("make a local web3");
    // 浏览器没有web3,则自己创建，这里选择provider为本地ganache
    const mnemonic = 'they among attend next vital music legal sketch author flower judge fiscal'
    // 真实测试网络
    // let provider = new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/d7ceb0287d484e679c9766662d462b44");
    // 本地ganache网络
    let provider = new HDWalletProvider(mnemonic, "http://localhost:7545");
    const OPTIONS = {
        defaultBlock: "latest",
        transactionConfirmationBlocks: 1,
        transactionBlockTimeout: 5
    }
    web3init = new Web3(provider, null, OPTIONS);
}

// 导出，外部可以导入使用
export default web3init