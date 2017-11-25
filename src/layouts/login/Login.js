import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, Icon, WhiteSpace } from 'antd-mobile'
import LoginFormContainer from '../../ui/loginform/LoginFormContainer'

class Login extends Component {
  render() {
    return(
      <main>
        <NavBar
          mode="dark"
        >WeUP Loyalty Framework</NavBar>
        <WingBlank>
          <LoginFormContainer />
          <WhiteSpace />
          <p style={{ fontSize: "0.9em", color: "#ccc", textAlign: "center" }}>
            Demo Account 1: demo1 / demo<br/>
            Demo Account 2: demo2 / demo<br/>
          </p>
        </WingBlank>
      </main>
    )
  }
}

export default Login
