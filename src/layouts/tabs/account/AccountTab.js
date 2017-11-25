import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, WhiteSpace, Icon, List } from 'antd-mobile'
import LogoutButton from '../../../ui/logoutbutton/LogoutButtonContainer'

const Item = List.Item

class AccountTab extends Component {
  componentDidMount() {
    this.props.getMerchants()
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
          <LogoutButton />
        </WingBlank>
      </div>
    )
  }
}

export default AccountTab
