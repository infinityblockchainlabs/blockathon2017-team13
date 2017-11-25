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

            const { username } = value
            
            if (username.length < 2) {
                return alert('Please fill in valid username (Ethereum address).')
            }
    
            this.props.onLoginUserClick(username)
        });
    }

    render() {
        const { getFieldProps } = this.props.form;
        
        return(
            <div>
                <WhiteSpace />
                <Loader loaded={this.state.isLoaded}>
                    <MessageDisplay />
                    <List>
                        <InputItem
                            {...getFieldProps('username')}
                            clear
                            placeholder="Enter ethereum address"
                        >Username</InputItem>
                        {/* <InputItem
                            {...getFieldProps('password')}
                            clear
                            placeholder="Enter passsword"
                        >Password</InputItem> */}
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
