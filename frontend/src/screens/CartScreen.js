import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Form, Card, Button, ListGroup, Image} from 'react-bootstrap'
import {useParams, useLocation, useNavigate, Link} from 'react-router-dom';
import {addToCart, removeFromCart} from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const qty = location.search ? Number(location.search.split('=')[1]): 1;
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart);

    useEffect(() => {
        if(params.id){
            dispatch(addToCart(params.id, qty));
        }  
        
    }, [dispatch, params, qty]);

    const checkoutHandler =() => {
        console.log('checkout');
        navigate('/login?redirect=shipping');
    }


  return (
    <Row>
        <h1>Shopping Cart</h1>
        <Col md={8}  style={{border: `1px solid red`}}>
            {cartItems.length === 0 
            ? <Message>Your cart is empty <Link to="/"> Go Back</Link>  </Message> 
            : <ListGroup variant="flush">
                {cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>
                                ${item.price}
                            </Col>
                            <Col md={2}>
                                <Form.Select value={item.qty} onChange={(e) => {
                                    dispatch(addToCart(item.product, Number(e.target.value)));
                                }}>
                                        {
                                            [...Array(item.countInStock).keys()].map(x => (
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                            ))
    
                                        }
                                </Form.Select>
                            </Col>
                            <Col>
                                <Button type="button" variant="light" onClick ={() => {
                                    dispatch(removeFromCart(item.product));
                                }}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </Col>
                            
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            }
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                         <h2>Subtotal ({cartItems.reduce((acc,item) => acc + item.qty, 0)}) items </h2>
                         ${cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                   <ListGroup.Item>
                   <div className="d-grid gap-2">
                            <Button 
                                disabled={cartItems.length ===0}
                                onClick = {checkoutHandler}
                                variant="dark" 
                                type="button" 
                            
                            >
                                Proceed to Checkout</Button>
                            </div>
                   </ListGroup.Item>

                </ListGroup>
            </Card>
        </Col>
        
    </Row>
  )
}

export default CartScreen