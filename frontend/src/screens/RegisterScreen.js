import React, {useState} from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'

import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const RegisterScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '';
    const dispatch = useDispatch();
    const {userInfo, loading, error} = useSelector(state => state.userRegister);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler =e => {
        e.preventDefault();
        // dispatch register
        if(password === confirmPassword){
            dispatch(register(name, email, password));
        } else {
            setMessage('Passwords do not match');
        }
        


    }
    if(loading){
        return <Loader />
    }

    if(!loading && userInfo){
        return <Navigate to={`/${redirect}`} />;
    }
  return (
    <FormContainer>
        <h1>Register</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        <Form onSubmit={submitHandler}>
        <Form.Group  controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name"
                value={name}
                onChange= {e => setName(e.target.value)}
            />
        </Form.Group>
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
        <Form.Group  controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password"
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
            />
        </Form.Group>

        <Button variant="primary" type="submit">
            Register
        </Button>
        </Form>
        <Row className="py-3">
            <Col>
            Have an Account?{' '} <Link to={redirect? (`/login?redirect=${redirect}`): ('/login')} >Sign In</Link>
            </Col>
        </Row>
        

    </FormContainer>
  )
}

export default RegisterScreen