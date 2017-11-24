import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, Icon } from 'antd-mobile'
import LoginFormContainer from '../../ui/loginform/LoginFormContainer'

class Login extends Component {
  render() {
    return(
      <main>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => { browserHistory.goBack() }}
          rightContent={[
            <Icon key="0" type="ellipsis" />
          ]}
        >Login</NavBar>
        <WingBlank>
          <LoginFormContainer />
        </WingBlank>
      </main>
    )
  }
}

export default Login
