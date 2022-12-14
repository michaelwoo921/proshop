import React, { useEffect, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'


const PlaceOrderScreen = () => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    if (!cart.shippingAddress.address) {
        navigate('/shipping')
      } else if (!cart.paymentMethod) {
        navigate('/payment')
      }

    // calcualte prices
    const addDecimals = num => {
        return (Math.round(num * 100) /100).toFixed(2);
    }
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart.shippingPrice =addDecimals(cart.itemsPrice > 100 ? 0: 100);
    cart.taxPrice = addDecimals(Number((.15* cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);
  
    const {order, success, error} = useSelector(state => state.orderCreate);

    

    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
         
        }
    }, [navigate, dispatch, order, success])

    const placeOrderhandler =() => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

  return (
    <Fragment>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address},
                            {cart.shippingAddress.city} {' '}
                            {cart.shippingAddress.postalCode} {' '},
                            {cart.shippingAddress.country}

                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message>Your Cart is Empty</Message> : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => {
                                    return (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                <Link to={`/product/${item.product}`} >{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items
                                </Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping
                                </Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax
                                </Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total
                                </Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" disabled={cart.cartItems.length === 0}
                                onClick ={placeOrderhandler}
                            >Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </Fragment>
  )
}

export default PlaceOrderScreen