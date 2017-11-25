import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, Button} from 'antd'

class ProductCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      image: props.image == null ? 'https://dummyimage.com/400x400/000/fff&text=Product+Image' : props.image,
      title: props.title,
      desc: props.desc,
      price: props.price,
      url: props.url,
      content: props.content
    }
  }

  render() {
    return (
      <Card bodyStyle={{padding: 0}} className="product-card">
        <div className="custom-image">
          <img alt="example" width="100%" src={this.state.image}/>
        </div>
        <div className="custom-card">
          <h3>{this.state.title}</h3>
          <p>{this.state.price}</p>
        </div>
        <div className="custom-card-footer">
          <Link to={this.state.url}>
            <Button type="primary">Buy Now</Button>
          </Link>
        </div>
      </Card>
    )
  }
}

export default ProductCard