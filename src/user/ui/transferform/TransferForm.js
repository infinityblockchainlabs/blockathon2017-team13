import React, { Component } from 'react'

class TransferForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: null,
      receiver: null,
      passPhrase: null
    }
  }

  onInputChangeReceiver(event) {
    this.setState({ receiver: event.target.value })
  }

  onInputChangeAmount(event) {
      this.setState({ amount: event.target.value })
  }

  onInputChangePassPhrase(event) {
      this.setState({ passPhrase: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { receiver, amount, passPhrase } = this.state
    this.props.onTransferFormSubmit(receiver, amount, passPhrase)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <legend className="pure-input-3-4">Transfer your tokens to other members.</legend>
          <label>Receiver Address</label>
          <input className="pure-input-3-4" type="text"
                 value={this.state.receiver}
                 onChange={this.onInputChangeReceiver.bind(this)}
                 placeholder="Please Enter Address"
          />
          <label>Amount</label>
          <input className="pure-input-3-4" type="text"
                 value={this.state.amount}
                 onChange={this.onInputChangeAmount.bind(this)}
                 placeholder="Please Enter Amount"
          />
          <input className="pure-input-3-4" type="text"
                 value={this.state.passPhrase}
                 onChange={this.onInputChangePassPhrase.bind(this)}
                 placeholder="Please Enter Pass Phrase"
          />
          <button type="submit" className="pure-button pure-button-primary">Confirm</button>
        </fieldset>
      </form>
    )
  }
}

export default TransferForm
