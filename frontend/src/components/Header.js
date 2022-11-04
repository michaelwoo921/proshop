import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {logout} from '../actions/userActions'

const Header = () => {
  const {userInfo, loading, error} = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const logoutHandler =() => {
    dispatch(logout());
  }
  return (
    <header>
         <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Proshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
            {userInfo ? (
               <NavDropdown title={userInfo.name} id="username">
               <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
               <NavDropdown.Item onClick={logoutHandler}>
                 Logout
               </NavDropdown.Item>
              
              
             </NavDropdown>
            ): (
                <Nav.Link href="/login"><i className="fas fa-user"></i> Sign In</Nav.Link>
            )}
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header