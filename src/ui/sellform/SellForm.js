import React, { Component } from 'react'

class SellForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 0,
      sellPrice: props.sellPrice,
      estimatedEtherReceived: 0,
      passPhrase: null
    }
  }

  onInputChange(event) {
    const amount = parseInt(event.target.value, 10)
    this.setState({ amount, estimatedEtherReceived: amount * this.state.sellPrice })
  }

  onInputChangePassPhrase(event) {
      this.setState({ passPhrase: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSellFormSubmit(this.state.amount, this.state.passPhrase)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <legend className="pure-input-3-4">Sell your tokens to get ETH.</legend>
          <label>Amount</label>
          <input className="pure-input-3-4" type="text" value={this.state.amount} onChange={this.onInputChange.bind(this)} placeholder="Please Enter Amount" />
          <label>Price</label>
          <input className="pure-input-3-4" type="text" value={this.state.sellPrice} readonly />
          <label htmlFor="tbalance">Total Estimated ETH Received</label>
          <input className="pure-input-3-4" type="text" value={this.state.estimatedEtherReceived} readonly />
          <label>Pass Phrase</label>
          <input className="pure-input-3-4" type="text" value={this.state.passPhrase} onChange={this.onInputChangePassPhrase.bind(this)} placeholder="Please Enter Pass Phrase" />
          <button type="submit" className="pure-button pure-button-primary">Confirm</button>
        </fieldset>
      </form>
    )
  }
}

export default SellForm
