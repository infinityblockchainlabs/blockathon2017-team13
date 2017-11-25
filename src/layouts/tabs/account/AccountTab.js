import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, Icon } from 'antd-mobile'
import LogoutButton from '../../../ui/logoutbutton/LogoutButtonContainer'

class AccountTab extends Component {
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
          <h1>Hi {this.props.name}</h1>
          <LogoutButton />
        </WingBlank>
      </div>
    )
  }
}

export default AccountTab
