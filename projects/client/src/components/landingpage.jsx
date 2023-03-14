import { Stack, Container, Row, Col, Button, Image } from 'react-bootstrap';
import NavbarTop from './navbar';
// import LocationDate from './locationdate';
import RangeDate from './daterange';
import CardProperty from './cardproperty';

import Banner from '../img/banner3.jpg';
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosInstance } from '../config/config.js';

function LandingPage() {
  const [propertys, setPropertys] = useState([]);

  const fetchPropertys = async () => {
    await axiosInstance.get('/propertys').then((res) => {
      // console.log(res.data.result);
      const datas = res.data.result;

      setPropertys([...datas]);
      console.log(datas);
    });
  };

  useEffect(() => {
    fetchPropertys();
  }, []);

  useEffect(() => {
    // console.log(propertys);
  }, [propertys]);

  return (
    <>
      <NavbarTop />
      <Container fluid className="d-grid gap-5">
        <Row className=" border-bottom border-1">
          <Image alt="" src={Banner} className="px-0" style={{ height: '100vh', width: '100vw' }} />
          {/* <Col className="">1 of 1</Col> */}

          <Col className="position-absolute rounded-2 p-3  shadow-sm top-0" style={{ marginTop: '100px', background: '#F4EBD0' }} md={{ span: 3, offset: 1 }}>
            {/* <LocationDate /> */}

            <RangeDate />
          </Col>
        </Row>
        <Container className="d-flex  gap-4">
          {propertys.map((val, idx) => {
            return <CardProperty fetchdata={fetchPropertys} key={idx} data={{ ...val }} />;
          })}
          {/* <CardProperty /> */}
        </Container>
        <Row className="border-top border-1" style={{ height: '60vh', background: '#F4EBD0' }}>
          <Col className="">1 of 1</Col>
        </Row>
      </Container>
    </>
  );
}

export default LandingPage;
