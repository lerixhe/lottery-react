pragma solidity ^0.5.10;

contract Lottery{
    // 管理员地址
    address public admin;
    // 当期中奖者
    address payable public winner;
    // 彩民地址数组
    address payable[] public buyers;
    // 当前期数,默认为1
    uint public round = 1;
    
    constructor()public{
        // 设置部署合约者为管理员
        admin = msg.sender;
    }
    // 修饰器：限定仅管理员可调用相关函数
    modifier onlyAdmin(){
        require(admin == msg.sender, "仅管理员可操作");
        _;
    }
    // 彩民下注，所有人均可参与
    function bet()public payable{
        // 每次限投1ether,可多次下注
        require(msg.value == 1 ether, "投注金额必须为1ETH");
        // 投注成功则存入彩民地址数组
        buyers.push(msg.sender);
    }

    // 开奖，仅管理员可以执行
    function draw()public onlyAdmin payable{
        // 参与人数不能为空
        require(buyers.length != 0, "参与人数为0，无法开奖");
        // 获取1个随机大数字，作为种子
        uint bigInt = uint(keccak256(abi.encodePacked(block.difficulty,now,buyers.length)));
        // 对参与人数取余。得出中奖序号
        uint index = bigInt % buyers.length;
        // 得出中奖者
        winner = buyers[index];
        // 发奖给中奖者
        winner.transfer(address(this).balance);

        // 本轮开奖结束
        round++;
        delete buyers;
    }

    // 退款函数
    function drawback()public onlyAdmin(){
        require(buyers.length != 0, "参与人数为0，无法退款");
        for(uint i = 0;i < buyers.length;i++){
            buyers[i].transfer(1 ether);
        }
        
        // 退款完成，结束本轮开奖
        round++;
        delete buyers;
    }
    // 辅助函数
    // 返回本轮所有彩民
    function getBuyers() public view returns(address payable[] memory){
        return buyers;
    }
    // 返回本轮奖池金额
    function getAmount() public view returns(uint){
        return address(this).balance;
    }
    // 返回管理员地址
    function getAdmin() public view returns(address){
        return admin;
    }
    // 返回当前期数
    function getRound() public view returns(uint){
        return round;
    }
    // 返回上轮中奖者
    function getWinner() public view returns(address payable){
        return winner;
    }
    // 返回当前彩民人数(人次)
    function getBuyersCount() public view returns(uint256){
        return buyers.length;
    }
}