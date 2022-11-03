import React, {Fragment, useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import {useDispatch, useSelector} from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import products from '../data/products';

const HomeScreen = () => {
  const {products, loading, error} = useSelector(state => state.productList);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(listProducts());
  }, [dispatch])
  if(loading){
    return <Loader />
  }
  
  if(!loading && error){
    return <Message variant='danger' >{error}</Message>
  }
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