import React, { Component } from 'react'

class ProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      coinbase: props.coinbase,
      tokenBalance: props.tokenBalance,
      ethBalance: props.ethBalance,
      passPhrase: null
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      name: props.name,
      coinbase: props.coinbase,
      tokenBalance: props.tokenBalance,
      ethBalance: props.ethBalance
    })
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  onInputChangePassPhrase(event) {
      this.setState({ passPhrase: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onProfileFormSubmit(this.state.name, this.state.passPhrase)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <legend className="pure-input-3-4">Edit your account details here.</legend>
          <label>Name</label>
          <input className="pure-input-3-4" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Enter Your Name" />
          <label>Ethereum Address</label>
          <input className="pure-input-3-4" type="text" value={this.state.coinbase} readonly />
          <label>Token Balance</label>
          <input className="pure-input-3-4" type="text" value={this.state.tokenBalance} readonly />
          <label>ETH Balance</label>
          <input className="pure-input-3-4" type="text" value={this.state.ethBalance} readonly />
          <label>Pass Phrase</label>
          <input className="pure-input-3-4" type="text" value={this.state.passPhrase} onChange={this.onInputChangePassPhrase.bind(this)} placeholder="Please Enter Pass Phrase" />
          <button type="submit" className="pure-button pure-button-primary">Update</button>
        </fieldset>
      </form>
    )
  }
}

export default ProfileForm
