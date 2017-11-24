import React, { Component } from 'react'
import { Link } from 'react-router'

import { NavBar, Icon, WingBlank, Button } from 'antd-mobile'

class Home extends Component {
  render() {
    return(
      <main>
        <NavBar
          mode="dark"
          rightContent={[
            <Icon key="0" type="ellipsis" />
          ]}
        >WeUP</NavBar>
        <WingBlank>
          <h2>You haven't logged in yet</h2>
          <Link to="/login"><Button>Login</Button></Link>
        </WingBlank>
      </main>
    )
  }
}

export default Home
