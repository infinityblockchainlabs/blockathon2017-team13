import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, WhiteSpace, Icon, List, Button } from 'antd-mobile'
import LogoutButton from '../../../ui/logoutbutton/LogoutButtonContainer'

const Item = List.Item

class AccountTab extends Component {
  componentDidMount() {
    setTimeout(() => this.props.getMerchants(), 500)
  }

  render() {
    return(
      <div>
        <NavBar
          mode="dark"
          rightContent={[
            <Icon key="0" type="ellipsis" />,
          ]}
        >Account</NavBar>
        <WingBlank>
          <h1>Hi {this.props.data.name}</h1>
          <List renderHeader='Collected Points' className="point-list">
            {this.props.merchants.map((m) => {
              return (
                <Item extra={m.points} key={m.name}>{m.name}</Item>
              )
            })}
            
          </List>
          <WhiteSpace />
          <Button type="primary">Link new site</Button>
          <WhiteSpace />
          <LogoutButton />
        </WingBlank>
      </div>
    )
  }
}

export default AccountTab
