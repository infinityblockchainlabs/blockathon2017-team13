import React, { Component } from 'react'
import Loader               from 'react-loader'
import { connect } from 'react-redux'
import ProfileFormContainer from '../../user/ui/profileform/ProfileFormContainer'
import BuyFormContainer from '../../user/ui/buyform/BuyFormContainer'
import TransferFormContainer from '../../user/ui/transferform/TransferFormContainer'
import SellFormContainer from '../../user/ui/sellform/SellFormContainer'
import MessageDisplay from '../../user/ui/util/MessageDisplay'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoaded: props.isLoaded }
  }

  componentWillReceiveProps (props) {
    this.setState({ isLoaded: props.isLoaded })
  }

  render() {
    return(
      <main className="container">
        <Loader loaded={ this.state.isLoaded }>
          <div className="pure-g">
            <div className="pure-u-1-1">
              <br/>
              <center>
                <MessageDisplay/>
              </center>
            </div>
          </div>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <h1>Your Profile</h1>
              <ProfileFormContainer />
            </div>
            <div className="pure-u-1-2">
              <h1>Buy Token</h1>
              <BuyFormContainer />
            </div>
          </div>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <h1>Transfer Token</h1>
              <TransferFormContainer />
            </div>
            <div className="pure-u-1-2">
              <h1>Sell Token</h1>
              <SellFormContainer />
            </div>
          </div>
        </Loader>
      </main>
    )
  }
}

const mapStateToProps = ({ user: { isLoaded } }) => {
    return { isLoaded }
}

export default connect(
    mapStateToProps,
    null
)(Dashboard)
