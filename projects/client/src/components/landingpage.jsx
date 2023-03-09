import { Stack, Container, Row, Col, Button, Image } from 'react-bootstrap';
import NavbarTop from './navbar';
import Banner from '../img/banner3.jpg';

function LandingPage() {
  return (
    <>
      <NavbarTop />
      <Container fluid className="d-grid gap-2">
        <Row className="" style={{ background: 'red' }}>
          <Image alt="" src={Banner} className="px-0" style={{ height: '100vh', width: '100vw' }} />
          {/* <Col className="">1 of 1</Col> */}
        </Row>
        <Container>
          <Row className="" style={{ height: '50vh', background: '#B68D40' }}>
            <Col className="">1 of 1</Col>
          </Row>
        </Container>
        <Row style={{ height: '80vh', background: '#F4EBD0' }}>
          <Col className="">1 of 1</Col>
        </Row>
      </Container>
    </>
  );
}

export default LandingPage;
