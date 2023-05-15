import { Container, Navbar, Nav, Button, NavLink } from 'react-bootstrap';
import Logo from '../img/jgreen.png';
import '../css/style.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import user_types from '../redux/auth/types';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function NavbarTop() {

  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useSelector((state) => state.auth) 
  console.log(auth);

  function logOut() {
    setIsLoggedIn(false);
    dispatch({
      type: user_types.USER_LOGOUT,
    });
    localStorage.clear();
  }
 
  return (
    <>
      <Navbar collapseOnSelect className="border-bottom border-1" expand="lg" sticky="top" style={{ background: '#F4EBD0' }} variant="light">
        <Container fluid className="fw-bold ms-4 me-4 ">
          <Navbar.Brand href="/" className="fs-4 ">
            <img alt="" src={Logo} width="40" height="40" className="d-inline-block align-center " /> JoyStay
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav ">
            <hr />
            <Nav className="me-auto ms-3">
              <Link id="btn-nav-left" className="mx-2" to="#features">
                Hotels
              </Link>
              
                <Link id="btn-nav-left" className="mx-2" to={auth.email? "/bookinglist": "/notfound"}>
                Booking List
              </Link>

              <Link id="btn-nav-left" className="mx-2" href="#pricing">
                About
              </Link>
              <Link id="btn-nav-left" className="mx-2" href="#pricing">
                About
              </Link>
              <Link id="btn-nav-left" className="mx-2" href="#pricing">
                About
              </Link>
             
            </Nav>
            <Nav className="gap-2">
              {auth.email ? (
                <>
                 <Link id="btn-nav-left" className="mx-2" href="#profile">
                  Profile
                </Link>
                  <Link size="sm" className="rounded-2" to="/" variant="light" id="btn-nav-left" onClick={logOut}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Button size="sm" className="rounded-2" href="/login" variant="light" id="btn-nav-tan">
                    Sign in
                  </Button>
                  <Button size="sm" className="rounded-2" id="btn-nav-tan2" variant="light" href="/register">
                    Sign up
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarTop;
