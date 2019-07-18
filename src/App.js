import web3 from './utils/InitWeb3';
import React from 'react';
import lottery from './eth/Lottery'

class App extends React.Component {
  // 利用构造函数初始化1个页面级全局变量，存储当前访问者身份
  constructor(){
    super()
    this.state={
      admin:'',
    }
  }
  // async componentWillMount() {
  //   // 获得当前助记词下，（在当前网络下的）账户地址
  //   let accounts = await web3.eth.getAccounts()
  //   // 访问区块链，获得合约管理员
  //   let admin = await lottery.methods.getAdmin().call();
  //   // 设置state
  //   this.setState({
  //     currentAccount:accounts[0],
  //     admin:admin
  //   })
  // }
  async componentWillMount() {
    let accounts = await web3.eth.getAccounts();
    let admin = await lottery.methods.getAdmin().call();
    let winner = await lottery.methods.getWinner().call();
    let buyers = await lottery.methods.getBuyers().call();
    console.log(buyers)
    let amount = await lottery.methods.getAmount().call();
    console.log(amount)
    let round = await lottery.methods.getRound().call();
    console.log(round)
    let buyersCount = await lottery.methods.getBuyersCount().call();
    console.log(buyersCount)


    this.setState({
      currentAccount:accounts[0],
      admin,
      winner,
      buyers,
      amount:amount.toString(),
      round:round.toString(),
      buyersCount:buyersCount.toString()
    })
  }
 render() {
   let test = async()=>{
      try {
        let accounts = await web3.eth.getAccounts()
        console.table(accounts)
        console.log("web3:" + web3.version)
      } catch (error) {
        console.log(error)
      }
    }
    test();
    return (
      <div>
          <h1>hello , welcome to Lottery</h1>
          <p>
            admin : {this.state.admin}
            <br />
            currentAccount : {this.state.currentAccount}
            <br />
            winner : {this.state.winner}
            <br />
            buyers : {this.state.buyers}
            <br />
            amount : {this.state.amount}
            <br />
            round : {this.state.round}
            <br />
            buyersCount : {this.state.buyersCount}
          </p>
      </div>
    );
  }
}

export default App;
