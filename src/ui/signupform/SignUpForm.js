import React, { Component } from 'react'
import Loader               from 'react-loader'
import MessageDisplay from '../util/MessageDisplay'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      coinbase: '',
      passPhrase: null,
      isLoaded: props.isLoaded
    }
  }

  componentWillReceiveProps (props) {
      this.setState({ isLoaded: props.isLoaded })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { name, coinbase, passPhrase } = this.state
    if (name.length < 2) {
      return alert('Please fill in valid name.')
    }

    if (coinbase.length < 2) {
        return alert('Please fill in valid Ethereum address.')
    }

    this.props.onSignUpFormSubmit(name, coinbase, passPhrase)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <Loader loaded={ this.state.isLoaded }>
          <MessageDisplay/>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name"
            />
            <span className="pure-form-message">This is a required field.</span>
            <br />
            <input id="coinbase" type="text" value={this.state.coinbase}
              onChange={(e) => this.setState({ coinbase: e.target.value })} placeholder="Ethereum Address"
            />
            <span className="pure-form-message">This is a required field.</span>
            <input id="passPhrase" type="text" value={this.state.passPhrase}
                   onChange={(e) => this.setState({ passPhrase: e.target.value })} placeholder="Pass Phrase"
            />
            <span className="pure-form-message">This is a required field.</span>
            <br />

            <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
          </fieldset>
        </Loader>
      </form>
    )
  }
}

export default SignUpForm
