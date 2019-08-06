import web3 from './utils/InitWeb3';
import React from 'react';
import lottery from './eth/Lottery'
// 导入自定义样式
import CardExampleCard from './display/ui'

class App extends React.Component {
  // 利用构造函数初始化1个页面级全局变量，存储当前访问者身份
  constructor() {
    super()
    this.state = {
      admin: "正在获取数据",
      winner: "0x000000000000000000000",
      currentAccount: "正在获取数据",
      buyersCount: 0,
      round: 0,
      amount: 0,
      isBetting: false,
      isDrawing: false,
      isDrawbacking: false,
      isShowButton: 'none',//默认不显示按钮
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
    // console.log(buyers)
    let amount = await lottery.methods.getAmount().call();
    if (amount == null) {
      amount = 0
    }
    amount = web3.utils.fromWei(amount.toString())
    // console.log(amount)
    let round = await lottery.methods.getRound().call();
    if (round == null) {
      round = 1
    }
    round = round.toString()
    // console.log(round)
    let buyersCount = await lottery.methods.getBuyersCount().call();
    if (buyersCount == null) {
      buyersCount = 0
    }
    buyersCount = buyersCount.toString()
    // console.log(buyersCount)
    if (admin == null) {
      admin = "未获取到智能合约地址，请勿投注";
      winner = "0x000000000000000000000"
      alert(`未获取到合约地址，为避免资金损失，请勿投注！`)
    }

    this.setState({
      currentAccount: accounts[0],
      admin,
      winner,
      buyers,
      amount,
      round,
      buyersCount,
      isShowButton: accounts[0] === admin ? 'inline' : 'none',

    })
  }
  // 定义下注函数为1个变量，等待前端调用
  bet = async () => {
    console.log('bet button is clicked!')
    this.setState({ isBetting: true })
    try {
      let accounts = await web3.eth.getAccounts();
      await lottery.methods.bet().send({
        from: accounts[0],
        value: 1 * 10 ** 18
      }, (error, _) => {
        if(error!==false){
          alert(`投注失败！${error}`)
          // 刷新页面
        }else{
          alert(`投注成功`)
        }
        this.setState({ isBetting: false })
        window.location.reload(true)
      })
    } catch (error) {
      alert(`投注失败，${error}`)
      this.setState({ isBetting: false })
    }
  }
  // 定义开奖函数
  draw = async () => {
    try {
      console.log("draw button is clicked")
      this.setState({ isDrawing: true })
      let accounts = await web3.eth.getAccounts()
      await lottery.methods.draw().send({
        from: accounts[0],
        // 无需附带金额
      }, (error, _) => {
        if(error!==false){
          alert(`开奖失败！${error}`)
          // 刷新页面
        }else{
          alert(`开奖成功\n区块链网络将自动发送奖励给胜利者！`)
        }
        this.setState({ isDrawing: false })
        window.location.reload(true)
      })

    } catch (error) {
      this.setState({ isDrawing: false })
      alert(`开奖失败,${error}`)
    }
  }
  // 定义退奖函数
  drawback = async () => {
    console.log("drawback button is clicked")
    this.setState({ isDrawbacking: true })
    try {
      let accounts = await web3.eth.getAccounts()
      await lottery.methods.drawback().send({
        from: accounts[0]
      }, (error, _) => {
        if(error!==false){
          alert(`退奖失败！${error}`)
          // 刷新页面
        }else{
          alert(`退奖成功！`)
        }
        this.setState({ isDrawbacking: false })
        window.location.reload(true)
      })
    } catch (error) {
      this.setState({ isDrawbacking: false })
      alert(`退奖失败,${error}`)
    }
  }
  // 定义全局禁用按钮函数，防止用户连续点击重复提交
  buttonDisableControl = () => {
    return this.state.isBetting || this.state.isDrawbacking || this.state.isDrawing
    // 只要有1个true，则全局true
  }
  render() {


    return (
      <CardExampleCard
        admin={this.state.admin}
        currentAccount={this.state.currentAccount}
        winner={this.state.winner}
        buyers={this.state.buyers}
        amount={this.state.amount}
        round={this.state.round}
        buyersCount={this.state.buyersCount}
        bet={this.bet}
        isBetting={this.state.isBetting}
        draw={this.draw}
        isDrawing={this.state.isDrawing}
        drawback={this.drawback}
        isDrawbacking={this.state.isDrawbacking}
        buttonDisableControl={this.buttonDisableControl}
        isShowButton={this.state.isShowButton}
      />
      // <div>
      //     <h1>hello , welcome to Lottery</h1>
      //     <p>
      //       admin : {this.state.admin}
      //       <br />
      //       currentAccount : {this.state.currentAccount}
      //       <br />
      //       winner : {this.state.winner}
      //       <br />
      //       buyers : {this.state.buyers}
      //       <br />
      //       amount : {this.state.amount}
      //       <br />
      //       round : {this.state.round}
      //       <br />
      //       buyersCount : {this.state.buyersCount}
      //     </p>
      // </div>
    );
  }
}

export default App;
