import { Stack, Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { MdLocationOn } from 'react-icons/md';

import NavbarTop from './navbar';
// import LocationDate from './locationdate';
import RangeDate from './daterange';
import CardProperty from './cardproperty';

import Banner from '../img/banner3.jpg';
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosInstance } from '../config/config.js';
import Footer from './footer';
import { useNavigate, Link } from 'react-router-dom';

function LandingPage() {
  const [propertys, setPropertys] = useState([]);
  // const [rooms, setRooms] = useState([]);
  // const [detail, setDetail] = useState([]);

  const fetchPropertys = async () => {
    await axiosInstance
      .get('/propertys')
      .then((res) => {
        // console.log(res.data.result);
        const datas = res.data.result;

        setPropertys([...datas]);
        console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchRooms = async () => {
  //   await axiosInstance
  //     .get(`/propertys/rooms/`)
  //     .then((res) => {
  //       const datas = res.data.result;
  //       setRooms([...datas]);
  //       // console.log({ ...datas2 });
  //       // navigate('/propertydetail/' + propertys.id);

  //       console.log(res.data.result);
  //       // navigate('/propertydetail');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    fetchPropertys();
    // fetchRooms();
    // console.log(rooms);
  }, []);

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
          {/* {propertys.map((val, idx) => {
            return <CardProperty fetchdata={fetchPropertys} key={idx} data={{ ...val }} />;
          })} */}
          {propertys.map((val, idx) => (
            <Row key={idx} data={{ ...val }} xs={1} md={2} className="g-4">
              {/* {Array.from({ length: 1 }).map((_, idx) => ( */}
              <Col>
                <Card className="" style={{ width: '16rem', cursor: 'pointer' }}>
                  {/* <a href={`/propertydetail`}> */}
                  <Link to={`/propertydetail/${val.id}`}>
                    <Card.Img className="" variant="top" style={{ height: '16rem', objectFit: 'cover' }} src={val.propertyImage} />
                  </Link>
                  <Card.Body className="">
                    <Card.Title>{val.name}</Card.Title>
                    <Card.Text style={{ fontSize: '13px' }}>
                      <MdLocationOn className="me-1" style={{ color: 'red' }} />
                      {val.category?.kecamatan}, {val.category?.kabupaten}, {val.category?.provinsi}
                    </Card.Text>
                  </Card.Body>
                  {/* </a> */}

                  {/* {idx.category.provinsi} */}
                  {/* <CardProperty/> */}
                </Card>
              </Col>
            </Row>
          ))}

          {/* <CardProperty /> */}
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default LandingPage;
