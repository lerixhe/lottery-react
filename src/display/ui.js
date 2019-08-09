import React from 'react'
import { Card, Icon, Image, Statistic, Label, Button } from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='images/logo.jpg' wrapped ui={false} />
        <Card.Content>
            <Card.Header>区块链线上彩站（示例）</Card.Header>
            <Card.Meta>
                <span className='date'>管理员地址：</span>
                <Label size='mini'>
                    <Icon name='hand point right' />{props.admin}
                </Label>
            </Card.Meta>
            <Card.Meta>
                <span className='date'>当前地址：</span>
                <Label size='mini'>
                    <Icon name='hand point right' />{props.currentAccount}
                </Label>
            </Card.Meta>
            <Card.Meta>
                <span className='date'>上期中奖地址：</span>
                <Label size='mini'>
                    <Icon name='hand point right' />{props.winner}
                </Label>
            </Card.Meta>
            <Card.Description>
                每晚8点开奖不见不散
      </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <span>
                <Icon name='user' />
                {props.buyersCount}人参与
      </span>
        </Card.Content>
        <Card.Content extra>
            <Statistic>
                <Statistic.Value color='red'>{props.amount}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>
        <Card.Content extra center>
            <Statistic.Value color='red' size='mini'>第{props.round}期</Statistic.Value>
            <Statistic.Label size='mini' as='a' href='https://kovan.etherscan.io/address/0x7db224a7dbb3dc73aeb3e874168889037bd22c87' >查看交易历史</Statistic.Label>
        </Card.Content>
        {/* 控制按钮 */}
        <Button animated='fade' color='orange' onClick={props.bet} loading={props.isBetting} disabled={props.buttonDisableControl()}>{/* 注意括号 */}
            <Button.Content visible>投注产生希望</Button.Content>
            <Button.Content hidden>购买放飞梦想</Button.Content>
        </Button>
        {/* 仅管理员显示以下组件 */}
        <Button inverted color='red' onClick={props.draw} loading={props.isDrawing} disabled={props.buttonDisableControl()} style={{display:props.isShowButton}}>开奖</Button>
        <Button inverted color='green' onClick={props.drawback} loading={props.isDrawbacking} disabled={props.buttonDisableControl()} style={{display:props.isShowButton}}>退奖</Button>
    </Card>
)

export default CardExampleCard