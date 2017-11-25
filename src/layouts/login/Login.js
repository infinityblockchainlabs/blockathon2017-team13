import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, Icon, WhiteSpace } from 'antd-mobile'
import LoginFormContainer from '../../ui/loginform/LoginFormContainer'
import './login.css'

class Login extends Component {
  render() {
    return(
      <main className="app-bg">
        <div style={{textAlign: 'center', padding: 100, height: 350}}>
          <img alt="example" width="200px"
               src="/images/weup.png"/>
          <br/>
          <br/>
          <p style={{fontSize: 14, fontWeight: 400, color: '#949494'}}>Loyalty Framework</p>
        </div>
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
