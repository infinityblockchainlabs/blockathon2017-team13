import React, { Component } from 'react'

class BuyForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 0,
      buyPrice: props.buyPrice,
      estimatedTokenReceived: 0,
      passPhrase: null
    }
  }

  onInputChange(event) {
    const amount = parseInt(event.target.value, 10)
    this.setState({ amount, estimatedTokenReceived: amount / this.state.buyPrice })
  }

  onInputChangePassPhrase(event) {
    this.setState({ passPhrase: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.onBuyFormSubmit(this.state.amount, this.state.passPhrase)
  }

  render() {
    const { amount, buyPrice, estimatedTokenReceived } = this.state
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <legend className="pure-input-3-4">Buy more tokens here.</legend>
          <label>Amount ETH</label>
          <input className="pure-input-3-4" type="number" value={amount}
                 onChange={this.onInputChange.bind(this)}
                 placeholder="Please Enter Amount"
          />
          <label>Price</label>
          <input className="pure-input-3-4" type="number" value={buyPrice} readonly />
          <label htmlFor="tbalance">Total Estimated Token Received</label>
          <input className="pure-input-3-4" type="number" value={estimatedTokenReceived} readonly />
          <label>Pass Phrase</label>
          <input className="pure-input-3-4" type="text" value={this.state.passPhrase} onChange={this.onInputChangePassPhrase.bind(this)} placeholder="Please Enter Pass Phrase" />
          <button type="submit" className="pure-button pure-button-primary">Buy</button>
        </fieldset>
      </form>
    )
  }
}

export default BuyForm
