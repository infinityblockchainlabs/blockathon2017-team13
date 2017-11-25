import React, {Component} from 'react'
import {Row, Col} from 'antd'
import ProductCard from './components/ProductCard'

class ProductList extends Component {
  render() {
    return (
      <div style={{background: '#ECECEC', padding: '30px'}}>
        <h1>Product List</h1>

        <Row gutter={16}>
          <Col md={6} sm={24} style={{marginTop: 16}}>
            <ProductCard title="Awesome Watch"
                         price="3.000.000 VND"
                         url="/merchant/cart"
                         image="https://vn-live-03.slatic.net/p/8/dong-ho-nam-day-thep-citizen-bd0041-89e-bac-hang-phan-phoi-chinh-thuc-1510422312-31135071-ced1cb1b0c9cfa473e5e6a12808b9573-webp-catalog_233.jpg"/>
          </Col>
          <Col md={6} sm={24} style={{marginTop: 16}}>
            <ProductCard title="Test"
                         price="200.000 VND"
                         url="/merchant/cart"
                         image="https://vn-live-02.slatic.net/p/7/tui-deo-cheo-1-quai-the-thao-du-lich-chong-nuoc-quan-doi-my-xanh-1496030674-3016906-bf469b8b641408d67141ff31e5667b9f-webp-catalog_233.jpg"/>
          </Col>
          <Col md={6} sm={24} style={{marginTop: 16}}>
            <ProductCard title="Test"
                         price="150.000 VND"
                         image="https://vn-live-01.slatic.net/p/7/bo-tui-deo-cheo-nam-tron-va-vi-da-nam-sang-trong-zavans-nau-1491748239-5851694-9d50de6cd2e92b85cb4a18a9ba8e20b4-webp-catalog_233.jpg"/>
          </Col>
          <Col md={6} sm={24} style={{marginTop: 16}}>
            <ProductCard title="Test"
                         price="100.000 VND"
                         image="https://vn-live-02.slatic.net/p/11/ca-phe-arabica-cau-dat-500g-1508821204-6520642-f9bbfc6bff46b29854345482c95d6aeb-webp-catalog_233.jpg"/>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col md={6} sm={24} style={{marginTop: 16}}>
            <ProductCard title="Test"
                         price="100.000 VND"
                         image="https://vn-live-02.slatic.net/p/4/nam-cham-xep-hinh-thong-minh-magcube-bukyballs-216-vien-5mm-tron-1491820292-1516125-bcd21a653bf0b821ffbf67dc645434e0-webp-catalog_233.jpg"/>
          </Col>
          <Col md={6} sm={24} style={{marginTop: 16}}>
            <ProductCard title="Test"
                         price="400.000 VND"
                         image="https://vn-live-01.slatic.net/p/3/ban-tron-de-dau-giuong-sang-trong-trang-size-50x37-1510419726-4925217-240e5cb3fb9daf8658d09d3e6179b11a-webp-catalog_233.jpg"/>
          </Col>
          <Col md={6} sm={24} style={{marginTop: 16}}>
            <ProductCard title="Test"
                         price="250.000 VND"
                         image="https://vn-live-03.slatic.net/p/8/kinh-phan-cuc-di-duong-ngay-va-dem-hato-a103ry-gong-den-1506834006-0606072-a131f3c069d12ba7498e9937f3b8e148-webp-catalog_233.jpg"/>
          </Col>
          <Col md={6} sm={24} style={{marginTop: 16}}>
            <ProductCard title="Test"
                         price="11.700.000 VND"
                         image="http://vn-live-01.slatic.net/p/2/may-quay-hanh-trinh-gopro-hero-6-black-1508491830-43206271-400cc6d30d019f163893d48650c56cac-webp-catalog_233.jpg"/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProductList