import React, { Component } from 'react'
import { connect } from 'react-redux'

class MessageDisplay extends Component {
    constructor(props) {
        super(props)
        const { errorMessage, infoMessage } = props
        this.state = { errorMessage, infoMessage }
    }

    componentWillReceiveProps (props) {
        const { errorMessage, infoMessage } = props
        this.setState({ errorMessage, infoMessage })
    }

    render() {
        const { errorMessage, infoMessage } = this.state
        return(
            errorMessage && errorMessage.length ? (<div style={{ color: 'red' }}>{errorMessage}</div>)
                : infoMessage && infoMessage.length
                ? (<div style={{ color: 'blue' }}>{infoMessage}</div>) : null
        )
    }
}

const mapStateToProps = (state) => {
    const { errorMessage, infoMessage } = state.user
    return { errorMessage, infoMessage }
}

export default connect(mapStateToProps, null)(MessageDisplay)
