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
      admin: '',
      isBetting: false,
      isDrawing: false,
      isDrawbacking: false,
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
    if(admin == null){
      alert(`未获取到合约地址，请联系管理员！`)
      return
    }
    let winner = await lottery.methods.getWinner().call();
    let buyers = await lottery.methods.getBuyers().call();
    // console.log(buyers)
    let amount = await lottery.methods.getAmount().call();
    if(amount == null){
      amount = 0
    }
    amount = web3.utils.fromWei(amount.toString())
    // console.log(amount)
    let round = await lottery.methods.getRound().call();
    if(round == null){
      round = 1
    }
    // console.log(round)
    let buyersCount = await lottery.methods.getBuyersCount().call();
    if(buyersCount == null){
      buyersCount = 0
    }
    // console.log(buyersCount)


    this.setState({
      currentAccount: accounts[0],
      admin,
      winner,
      buyers,
      amount,
      round: round.toString(),
      buyersCount: buyersCount.toString()
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
      })
      alert(`投注成功！`)
      this.setState({ isBetting: false })
      // 刷新页面
      window.location.reload(true)
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
      })
      alert(`开奖成功\n本次获奖者是：${this.state.winner}`)
      this.setState({isDrawing:false})
      window.location.reload(true)
    } catch (error) {
      this.setState({isDrawing:false})
      alert(`开奖失败,${error}`)
    }
  }
  // 定义退奖函数
  drawback = async ()=>{
    console.log("drawback button is clicked")
    this.setState({isDrawbacking:true})
    try {
      let accounts = await web3.eth.getAccounts()
      await lottery.methods.drawback().send({
        from:accounts[0]
      })
      alert(`退奖成功！`)
      this.setState({isDrawbacking:false})
      window.location.reload(true)
    } catch (error) {
      this.setState({isDrawbacking:false})
      alert(`退奖失败,${error}`)
    }
  }
  // 定义全局禁用按钮函数，防止用户连续点击重复提交
  buttonDisableControl = ()=>{
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
