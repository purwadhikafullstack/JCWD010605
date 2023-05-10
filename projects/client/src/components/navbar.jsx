import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import Logo from '../img/jgreen.png';
import '../css/style.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';



function NavbarTop() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useSelector((state) => state.auth) 
  console.log(auth);

  const handleLogout = () => {
    
    setIsLoggedIn(false);
  };
  

  
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
              <Nav.Link className="mx-2" href="#features">
                Hotels
              </Nav.Link>
              <Nav.Link className="mx-2" href="/bookinglist">
                Booking List
              </Nav.Link>
              <Nav.Link className="mx-2" href="#pricing">
                About
              </Nav.Link>
              {auth.email && (
                <Nav.Link className="mx-2" href="#profile">
                  Profile
                </Nav.Link>
              )}
            </Nav>
            <Nav className="gap-2">
              {auth.email ? (
                <>
                  <Button size="sm" className="rounded-2" variant="light" id="btn-nav-tan" onClick={handleLogout}>
                    Logout
                  </Button>
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
