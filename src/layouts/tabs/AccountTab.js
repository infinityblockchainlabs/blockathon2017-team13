import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, Icon } from 'antd-mobile'
import LogoutButton from '../../ui/logoutbutton/LogoutButtonContainer'

class AccountTab extends Component {
  render() {
    return(
      <WingBlank>
        <LogoutButton />
      </WingBlank>
    )
  }
}

export default AccountTab
