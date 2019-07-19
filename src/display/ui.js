import React from 'react'
import { Card, Icon, Image, Statistic, Label } from 'semantic-ui-react'

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
            <Card.Description>
                每晚8点开奖不见不散
      </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                {props.buyersCount}人参与
      </a>
        </Card.Content>
        <Card.Content extra>
            <Statistic>
                <Statistic.Value color='red'>{props.amount}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>
        <Card.Content extra>
            <Statistic label='查看交易历史' size='mini' horizontal >第{props.round}期</Statistic>
        </Card.Content>
    </Card>
)

export default CardExampleCard