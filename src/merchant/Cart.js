import React, {Component} from 'react'
import {Row, Col, Card, Input, Button, Icon} from 'antd'
import {Link} from 'react-router'

class Cart extends Component {
  handlePurchaseClick() {
    this.props.purchase()
  }

  render() {
    return (
      <div style={{background: '#ECECEC', padding: '30px'}}>
        <h1>1 item in your cart</h1>

        <Row gutter={16}>
          <Col md={16} sm={24} style={{marginTop: 16}}>
            <Card bodyStyle={{padding: 10}} className="product-card">
              <Row>
                <Col sm={6}>
                  <div>
                    <img alt="example" width="100%"
                         src="https://vn-live-03.slatic.net/p/8/dong-ho-nam-day-thep-citizen-bd0041-89e-bac-hang-phan-phoi-chinh-thuc-1510422312-31135071-ced1cb1b0c9cfa473e5e6a12808b9573-webp-catalog_233.jpg"/>
                  </div>
                </Col>
                <Col sm={12}>
                  <div style={{paddingLeft: 10}}>
                    <h3>Awesome Watch</h3>
                    <p>This is a very cool watch.</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div style={{paddingLeft: 10, fontWeight: 600}}>
                    <p>3.000.000 VND</p>
                  </div>
                  <div style={{paddingLeft: 10}}>
                    x&nbsp;<Input style={{width: 40}} value="1"/>
                  </div>
                  <div style={{
                    paddingLeft: 10,
                    paddingTop: 10,
                    marginTop: 10,
                    color: '#D4232B',
                    fontWeight: 600,
                    borderTop: '1px solid #80808066'
                  }}>
                    <p>3.000.000 VND</p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={8} sm={24} style={{marginTop: 16}}>
            <Card title="Card Summary" bordered={false}>
              <p>Total</p>
              <p style={{fontWeight: 700, fontSize: 18}}>3.000.000 VND</p>
              <p>Loyalty points: <span>3000</span></p>
              <div style={{marginTop: 20}}>
                <Link to="/merchant/purchased">
                  <Button type="primary">
                    <Icon type="shopping-cart"/>Purchase
                  </Button>
                </Link>
                <Link to="/merchant">
                  <Button style={{marginLeft: 10}} type="default">
                    Cancel
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Cart