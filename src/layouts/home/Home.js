import React, { Component } from 'react'
import { Link } from 'react-router'

import { NavBar, Icon, WingBlank, Button, WhiteSpace } from 'antd-mobile'

class Home extends Component {
  render() {
    return(
      <main>
        <NavBar
          mode="dark"
          rightContent={[
            <Icon key="0" type="ellipsis" />
          ]}
        >WeUp</NavBar>
        <WingBlank>
          <WhiteSpace />
          <div style={{ textAlign: 'center' }}>
            <h2>A loyalty blockchain framework</h2>
          </div>
          <WhiteSpace />
          <Link to="/login"><Button>Login</Button></Link>
        </WingBlank>
      </main>
    )
  }
}

export default Home
