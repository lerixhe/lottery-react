//编译智能合约的脚本
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const srcpath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
// console.log(srcpath)
const source = fs.readFileSync(srcpath, 'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}

let output = JSON.parse(solc.compile(JSON.stringify(input)))
// console.log(output)
// `output` here contains the JSON output as specified in the documentation
let result
let abi
for (let contractName in output.contracts['Lottery.sol']) {

    result = output.contracts['Lottery.sol'][contractName]
    abi = result.abi,
    bytecode = result.evm.bytecode.object
    // console.log(result)
    console.log(abi)
    console.log(bytecode)
}
module.exports = {
    abi,
    bytecode
}