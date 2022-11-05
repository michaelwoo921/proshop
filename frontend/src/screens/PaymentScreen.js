import React, {useState} from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'

import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import { savePaymentMethod} from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';



const PaymentScreen = () => {

    const {shippingAddress} = useSelector(state => state.cart)

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const dispatch = useDispatch();
    const navigate = useNavigate()
    if(!shippingAddress){
        navigate('/shippingAddress')
    }

const submitHandler =(e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    console.log(paymentMethod);
    navigate('/placeorder');
}

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit = {submitHandler}>
        <Form.Group>
            <Form.Label as ="legend">Select Method</Form.Label>
        <Col>
            <Form.Check type="radio" label="Paypal or Credit Card" id="PayPal"
            name="paymentMethod" value="PayPal" checked onChange = {e => {
                setPaymentMethod(e.target.value);
                console.log(paymentMethod)
                }}></Form.Check>
        </Col>
        <Col>
            <Form.Check type="radio" label="Stripe" id="Stripe"
            name="paymentMethod" value="Stripe" onChange = {e => setPaymentMethod(e.target.value)}></Form.Check>
        </Col>
        </Form.Group>
      
        <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen