import React, {Fragment} from 'react';
import {useParams, Link} from 'react-router-dom';
import products from '../data/products';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../components/Rating';


const ProductScreen = () => {
    const params = useParams();
    const product = products.find(p => p._id === params.id);
    
  return (
    <Fragment>
        <Link to="/" className="btn btn-light my-3"> Go Back</Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3} >
                <ListGroup  variant="flush">
                    <ListGroup.Item>
                    <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col><strong>${product.price}</strong></Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>{product.countInStock>0 ? 'In Stock' : 'Out of Stock'}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                            <Button variant="dark" type="button" disabled={product.countInStock === 0}>Add to Cart</Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </Fragment>
  )
}

export default ProductScreen