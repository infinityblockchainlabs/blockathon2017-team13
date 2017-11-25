import React, {Component} from 'react'
import Loader               from 'react-loader'
import MessageDisplay from '../util/MessageDisplay'

import {List, InputItem, WhiteSpace, Button, Icon} from 'antd-mobile'
import {createForm} from 'rc-form'
import './login.css'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coinbase: '',
      isLoaded: props.isLoaded
    }
  }

  componentWillReceiveProps(props) {
    this.setState({isLoaded: props.isLoaded})
  }

    submit() {
        this.props.form.validateFields((error, value) => {


      const {username, password} = value

      if (username.length < 3) {
        return alert('Please fill in valid username')
      }

      this.props.onLoginUserClick(username, password)
    });
  }

  render() {
    const {getFieldProps} = this.props.form;

    return (
      <div>
        <Loader loaded={this.state.isLoaded}>
          <MessageDisplay />
          <List>
            <InputItem {...getFieldProps('username')}
                       clear placeholder="Username">
              <div style={{
                backgroundImage: 'url(/images/account-circle-1.svg)',
                backgroundSize: 'cover',
                height: '22px',
                width: '22px'
              }}/>
            </InputItem>
            <InputItem {...getFieldProps('password')}
                       type="password"
                       clear placeholder="Password">
              <div style={{
                backgroundImage: 'url(/images/lock-close-1.svg)',
                backgroundSize: 'cover',
                height: '22px',
                width: '22px'
              }}/>
            </InputItem>
            <div style={{height: 20}}/>
            <List.Item>
              <Button type="ghost" onClick={() => this.submit() }>Login</Button>
            </List.Item>
          </List>
        </Loader>
      </div>
    )
  }
}

export default createForm()(LoginForm)
