import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, Icon } from 'antd-mobile'

class Profile extends Component {
  render() {
    return(
      <main>
        <NavBar
          mode="dark"
          rightContent={[
            <Icon key="0" type="ellipsis" />
          ]}
        >Profile</NavBar>
        <WingBlank>
        </WingBlank>
      </main>
    )
  }
}

export default Profile
