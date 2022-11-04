import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'

import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const LoginScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '';
    const dispatch = useDispatch();
    const {userInfo, loading, error} = useSelector(state => state.userLogin);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler =e => {
        e.preventDefault();
        dispatch(login(email, password));


    }
    if(loading){
        return <Loader />
    }
    if(!loading && error){
        return (
            <Message>{error}</Message>
        )
    }
    if(!loading && userInfo){
        return <Navigate to={`/${redirect}`} />;
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group  controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
                value={email}
                onChange= {e => setEmail(e.target.value)}
            />
        </Form.Group>
        <Form.Group  controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"
                value={password} onChange={e => setPassword(e.target.value)}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Sign In
        </Button>
        </Form>
        <Row className="py-3">
            <Col>
            New Customer?{' '} <Link to="/register" >Register</Link>
            </Col>
        </Row>
        

    </FormContainer>
  )
}

export default LoginScreen