import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap';
import Rating from './Rating';

const Product = ({product}) => {
  return (
    <Fragment>
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`} alt="product image">
                <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`} alt="product image">
                <Card.Title as="div"><strong>{product.name} </strong></Card.Title>
                </Link>
                <Card.Text as="div">
                <div className="my-3">
                    <Rating value={product.rating} text = {`${product.numReviews}  reviews`} 
                    />
                </div>
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
                </Card.Body>       
        </Card>
    </Fragment>
  )
}



export default Product