import React, { Component } from 'react'
import {Card, Row, Col, Icon} from 'antd'

class PurchasedSuccess extends Component {
  render() {
    return (
      <div style={{background: '#ECECEC', padding: '30px'}}>
        <Card>
          <Row style={{justify: 'center'}}>
            <Col md={8} sm={24} style={{marginTop: 16}}></Col>
            <Col md={8} sm={24} style={{marginTop: 16}}>
              <div style={{textAlign: 'center', width: '100%'}}>
                <Icon type="check-circle" style={{fontSize: 100, color: '#1F90E6' }} />
                <br/>
                <br/>
                <p>Thank you for shopping with us.</p>
                <p>You have been rewarded 3000 points.</p>
              </div>
            </Col>
            <Col md={8} sm={24} style={{marginTop: 16}}></Col>
          </Row>
        </Card>
      </div>
    )
  }
}

export default PurchasedSuccess