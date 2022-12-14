import React, { useEffect, Fragment, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector,  } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader';
import { getOrderDetails, deliverOrder } from '../actions/orderActions';
import axios from 'axios';
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js';
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
  } from '../constants/orderConstants'


const OrderScreen = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [sdkReady, setSdkReady] = useState(false)

    const {order, loading, error} = useSelector(state => state.orderDetails);
    const {loading:loadingPay, success: successPay} = useSelector(state => state.orderPay);
    const { loading: loadingDeliver, success: successDeliver } = useSelector(state => state.orderDeliver);
    const {userInfo} = useSelector((state) => state.userLogin);
    let clientId;

    console.log(order);

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals(
          order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
      }
// script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"
    useEffect(() => {

        if(!userInfo){
            navigate('/login');
        }
        const addPayPalScript = async () => {
            clientId = await axios.get('/api/config/paypal').data.clientId;
            setSdkReady(true);
            // const script = document.createElement('script')
            // script.type = 'text/javascript'
            // script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            // script.async = true
            // script.onload = () => {
            //   setSdkReady(true)
            // }
            // document.body.appendChild(script)
        }

        if(!order || successPay || successDeliver || order._id !== params.id){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(params.id))
        } else if (!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true);
            }
        }

      
    }, [dispatch, params, successPay, successDeliver, order, navigate, userInfo]);

const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    // dispatch(payOrder(params.id, paymentResult));
}   
const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return ( loading ? <Loader />: error? <Message variant='danger'>{error}</Message> : (
    <Fragment>
          <PayPalScriptProvider options={{"client-id": 'AVwLiJmnPvxzhExzlesAXICwSTmnX0wS8MILiUqEnRGcVUBpbSMjH5jz2P3gsCo25JSHONnqv_o6DdKG'}}>
            
        <h1> Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                       <p><strong>Name: </strong> {order.user.name} </p>
                        <p> <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address},
                            {order.shippingAddress.city} {' '}
                            {order.shippingAddress.postalCode} {' '},
                            {order.shippingAddress.country}

                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : (
                            <Message variant='danger'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : (
                            <Message variant='danger'>Not Paid</Message>
                        )}
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Your Order is Empty</Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => {
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping
                                </Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax
                                </Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total
                                </Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>     
                                  {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader/>}
                                {!sdkReady ? <Loader />: (
                                    <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: order.totalPrice
                                                    }
                                                }
                                            ]
                                        }).then(orderId => {
                                            // code here
                                            return orderId
                                        })
                                    }}

                                    onApprove ={(data, actions) => {
                                        return actions.order.capture().then(details => {
                                            const name= details.payer.name.given_name;
                                            successPaymentHandler(details);
                                        })
                                    }}
                                     />
                                )}
                            </ListGroup.Item>
                        )}  
                          {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
                       
            
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </PayPalScriptProvider>
    </Fragment>
  )
    
  )
}

export default OrderScreen;