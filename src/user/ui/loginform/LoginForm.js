import React, { Component } from 'react'
import Loader               from 'react-loader'
import MessageDisplay from '../util/MessageDisplay'

import { List, InputItem, WhiteSpace, Button } from 'antd-mobile'
import { createForm } from 'rc-form'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
          coinbase: '',
          isLoaded: props.isLoaded
        }
    }

    componentWillReceiveProps (props) {
        this.setState({ isLoaded: props.isLoaded })
    }

    submit() {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);

            const { coinbase } = value
            
            if (coinbase.length < 2) {
                return alert('Please fill in valid Ethereum address.')
            }
    
            this.props.onLoginUserClick(coinbase)
        });
    }

    render() {
        const { getFieldProps } = this.props.form;
        
        return(
            <div>
                <List>
                    <InputItem
                        {...getFieldProps('username')}
                        clear
                        placeholder="Enter username"
                        ref={el => this.autoFocusInst = el}
                    >Username</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        clear
                        placeholder="Enter passsword"
                        ref={el => this.customFocusInst = el}
                    >Password</InputItem>
                    <List.Item>
                        <Button type="ghost" onClick={() => this.submit() }>Login</Button>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default createForm()(LoginForm)
