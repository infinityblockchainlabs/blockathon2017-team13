import React, { Component } from 'react'
import { Link } from 'react-router'
import { NavBar, Icon } from 'antd-mobile'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'

import { restoreSession } from './ui/loginform/LoginFormActions'

// Styles
import 'antd-mobile/dist/antd-mobile.css'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { cookies } = ownProps

  return {
    restoreUserSession: () => {
      dispatch(restoreSession(cookies))
    }
  }
}

class App extends Component {
  componentWillMount() {
    // this.props.restoreUserSession()
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default withCookies(AppContainer)
