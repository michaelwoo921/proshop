import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'

import {Table, Form, Button, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails, updateUserProfile} from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';


const ProfileScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user , loading, error} = useSelector(state => state.userDetails);
    const {userInfo} = useSelector(state => state.userLogin);
    const {success} = useSelector(state => state.userUpdateProfile);

    const {loading: loadingOrders , error: errorOrders, orders} = useSelector(state => state.orderListMy);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        } else {
            if(user && user.name && !success){
                setName(user.name);
                setEmail(user.email);
              
            }else{
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders())
            }
        }
    }, [navigate, dispatch,user, userInfo])

    const submitHandler =e => {
        e.preventDefault();
        // dispatch register
        if(password === confirmPassword){
            // dispatch update profile
            dispatch(updateUserProfile({_id: user._id, name, email, password}));
        } else {
            setMessage('Passwords do not match');
        }
        


    }
  
 
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile </h2>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
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
                Update
            </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2> My order</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message>: (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                 <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.subString(0, 10): (
                                    <i className="fas fa-times" style={{color: 'red'}}></i>
                                )}</td>
                                 <td>{order.isDelivered ? order.deliveredAt.subString(0, 10): (
                                    <i className="fas fa-times"  style={{color: 'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                    <Button className="btn-sm" variant="light">Details</Button>
                                    </LinkContainer>
                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) }
        </Col>
    </Row>
  )
}

export default ProfileScreen