import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import Logo from '../img/jgreen.png';
import '../css/style.css';

function NavbarTop() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" sticky="top" style={{ background: '#F4EBD0' }} variant="light">
        <Container fluid className="fw-bold ms-4 me-4">
          <Navbar.Brand href="#home" className="fs-4 ">
            <img alt="" src={Logo} width="40" height="40" className="d-inline-block align-center " /> JoyStay
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav ">
            <hr />
            <Nav className="me-auto ms-3">
              <Nav.Link className="mx-2" href="#features">
                Hotels
              </Nav.Link>
              <Nav.Link className="mx-2" href="#pricing">
                About
              </Nav.Link>
              <Nav.Link className="mx-2" href="#pricing">
                About
              </Nav.Link>
              <Nav.Link className="mx-2" href="#pricing">
                About
              </Nav.Link>
            </Nav>
            <Nav className="gap-2">
              <Button size="sm" className="rounded-2" href="#" variant="outline-success">
                Sign in
              </Button>
              <Button size="sm" className="rounded-2" href="#" variant="success">
                Sign up
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarTop;
