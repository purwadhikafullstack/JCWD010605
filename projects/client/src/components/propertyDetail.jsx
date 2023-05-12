import { Image, Container, Row, Col, Button, Badge, Form, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import NavbarTop from './navbar';
import Banner from '../img/banner3.jpg';
import Footer from './footer';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { axiosInstance } from '../config/config.js';
import '../css/style.css';

export default function PropertyDetail() {
  const [detailPro, setDetailPro] = useState([]);
  const [roomsDetail, setRoomsDetail] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const { id } = useParams();

  const fetchDetailProperty = async () => {
    await axiosInstance
      .get(`/propertys/detail/${id}`)
      .then((res) => {
        const datas = res.data.result;
        setDetailPro([...datas]);

        console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchRoomsDetail = async () => {
    await axiosInstance
      .get(`/propertys/rooms/${id}`)
      .then((res) => {
        const datas2 = res.data.result;
        setRoomsDetail([...datas2]);

        console.log(datas2);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDetailProperty();
    fetchRoomsDetail();
    console.log(detailPro);
  }, []);
  console.log(selectedRooms);

  return (
    <>
      <NavbarTop />
      {detailPro.map((detail) => (
        <Container fluid key={detail.id} className="mb-3">
          <Row>
            <Image alt="" src={detail.propertyImage} className="m-0 p-0" style={{ height: '25rem', width: '100%', objectFit: 'cover' }} />
          </Row>
          <div className="sticky-card ">
            <Card className="selected-rooms-card cardPosition2 shadow position-absolute translate-middle-y" style={{ height: '25rem' }}>
              <Card.Body>
                <Card.Title>Selected Rooms</Card.Title>
                {selectedRooms.length > 0 ? (
                  <ul>
                    {roomsDetail
                      .filter((room) => selectedRooms.includes(room.id))
                      .map((room) => (
                        <li key={room.id}>{room.name}</li>
                      ))}
                  </ul>
                ) : (
                  <p>Please select room</p>
                )}

                <Button>Book Now</Button>
              </Card.Body>
            </Card>
          </div>

          <Container className="">
            <Row className="mt-5">
              <Col md={8} className="">
                <h4>{detail.name}</h4>
                <p>
                  {detail.description}
                  <br />
                  {detail.category?.kecamatan}, {detail.category?.kabupaten}, {detail.category?.provinsi}
                </p>
                <hr className="mt-4" />
              </Col>
              <Col md={4} className=""></Col>
            </Row>
          </Container>
          {detailPro.map((detail) => (
            <Container key={detail.id} className="">
              <Row className="">
                <Col md={8} className="">
                  Fasilities
                </Col>
                <Col md={4} className=""></Col>
              </Row>
              <Row className="">
                <Col md={8} className="">
                  {detail.fasilities?.map((fasility) => (
                    <Badge key={fasility.id} bg="secondary" className="me-2">
                      {fasility.name}
                    </Badge>
                  ))}
                  <hr className="my-4" />
                </Col>
                <Col md={4} className=""></Col>
              </Row>
              <Row className=" ">
                <Col md={8} className="">
                  <h4>Choose your room </h4>
                </Col>

                <Col md={4} className=""></Col>
              </Row>
            </Container>
          ))}
        </Container>
      ))}
      {roomsDetail.map((room) => (
        <Container key={room.id} className="">
          <Row className="">
            <Col md={4} className="bg-success">
              <Form.Check
                type="checkbox"
                id={room.id}
                checked={selectedRooms.includes(room.id)}
                style={{ whiteSpace: 'pre-wrap' }}
                label={`${room.name} \n${room.description}`}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setSelectedRooms((prevSelectedRooms) => {
                    if (isChecked) {
                      return [...prevSelectedRooms, room.id];
                    } else {
                      return prevSelectedRooms.filter((selectedRoomId) => selectedRoomId !== room.id);
                    }
                  });
                }}
                disabled={room.status === 'Booked'}
              />
              <p className="ms-4"></p>
            </Col>
            <Col md={2} className="bg-danger">
              <p>{room.special_price?.price}</p>
            </Col>
            <Col md={2} className="bg-secondary">
              <p>{room.status}</p>
            </Col>
            <Col md={4} className=""></Col>
          </Row>
        </Container>
      ))}
      <Container fluid className="sticky-stop">
        <Footer />
      </Container>
    </>
  );
}
