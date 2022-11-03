import React, {Fragment, useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
// import products from '../data/products';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, [])
  return (
    <Fragment>
        <h1>Latest Products</h1>
        <Row>
            {products.map(product => {
                return (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                         <Product product = {product} />
                    </Col>
                )
            })}
        </Row>
    </Fragment>
  )
}

export default HomeScreen