import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import { NavBar, Icon } from 'antd-mobile'

// UI Components
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import 'antd-mobile/dist/antd-mobile.css'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
        </li>
        <LogoutButtonContainer />
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/signup" className="pure-menu-link">Sign Up</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/login" className="pure-menu-link">Login</Link>
        </li>
      </span>
    )

    return (
      <div>
        {this.props.children}
      </div>

      // <div className="App">
      //   <nav className="navbar pure-menu pure-menu-horizontal">
      //     <ul className="pure-menu-list navbar-right">
      //       <OnlyGuestLinks />
      //       <OnlyAuthLinks />
      //     </ul>
      //     <Link to="/" className="pure-menu-heading pure-menu-link">WeUp</Link>
      //   </nav>

      //   {this.props.children}
      // </div>
    );
  }
}

export default App
