import { Stack, Container, Row, Col, Button, Image } from 'react-bootstrap';
import NavbarTop from './navbar';
// import LocationDate from './locationdate';
import RangeDate from './daterange';

import Banner from '../img/banner3.jpg';

function LandingPage() {
  return (
    <>
      <NavbarTop />
      <Container fluid className="d-grid gap-2">
        <Row className="">
          <Image alt="" src={Banner} className="px-0" style={{ height: '100vh', width: '100vw' }} />
          {/* <Col className="">1 of 1</Col> */}
          <Col className="position-absolute bg-light p-3 rounded-3 " style={{ marginTop: '100px' }} md={{ span: 3, offset: 2 }}>
            {/* <LocationDate /> */}
            <RangeDate />
          </Col>
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
