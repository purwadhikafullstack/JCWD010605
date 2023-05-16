import {
  Image,
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
  Modal,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import NavbarTop from './navbar';
import Footer from './footer';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../config/config.js';
import '../css/style.css';

import { DateRange } from 'react-date-range';
import moment from 'moment';
import 'moment-timezone';

export default function PropertyDetail() {
  const [detailPro, setDetailPro] = useState([]);
  const [roomsDetail, setRoomsDetail] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

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

  const convertDate = (date) => {
    return moment.tz(date, 'Asia/Jakarta');
  };

  const addTransaction = async (val) => {
    const confirmReservation = window.confirm(
      'Are you sure you want to reserve this room?'
    );

    if (confirmReservation) {
      await axiosInstance
        .post('/propertys/transaction', {
          room_id: val.id,
          tgl_checkin: convertDate(dateRange[0].startDate),
          tgl_checkout: convertDate(dateRange[0].endDate),
        })
        .then((res) => {
          const data = res.data.result;
          console.log(data);
          // update status of room to 'Booked'
          // val.status = 'Booked';
          val.status = 'Booked';

          // update roomsDetail with new status
          setRoomsDetail([...roomsDetail]);

          // add selected room to array
          setSelectedRooms([val]);
          // setShowSelectedRooms(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    fetchDetailProperty();
    fetchRoomsDetail();
    console.log(selectedRooms);
  }, []);

  return (
    <>
      <NavbarTop />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Date</Modal.Title>
        </Modal.Header>

        <Modal.Body className="">
          <h5>{selectedRooms.name}</h5>

          <Container className="text-center">
            <DateRange
              className=""
              onChange={handleSelect}
              showDateDisplay={true}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              months={2}
              minDate={new Date()}
              direction="horizontal"
            />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              addTransaction(selectedRooms);
              handleClose();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {detailPro.map((detail) => (
        <Container fluid key={detail.id} className="mb-3">
          {/* detail property image */}
          <Row>
            <Image
              alt=""
              src={detail.propertyImage}
              className="m-0 p-0"
              style={{ height: '25rem', width: '100%', objectFit: 'cover' }}
            />
          </Row>
          {/* sticky card */}
          {selectedRooms.length > 0 && (
            <div className="sticky-card ">
              <Card
                className="selected-rooms-card cardPosition2 shadow position-absolute translate-middle-y p-3 bg-light"
                style={{ height: '25rem' }}
              >
                <Card.Body
                  className=" rounded "
                  style={{ backgroundColor: '#e1e6ea' }}
                >
                  <Card.Title className="text-center">
                    Selected Rooms
                  </Card.Title>
                  {selectedRooms.map((room) => (
                    <div key={room.id}>
                      <h6>{room.name}</h6>
                      <p>{room.description}</p>
                      <p>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(room.special_price?.price)}
                      </p>
                    </div>
                  ))}
                  <Button
                    className="position-absolute"
                    style={{ top: '21rem', left: '9rem' }}
                    href="/bookinglist"
                  >
                    continue
                  </Button>
                </Card.Body>
              </Card>
            </div>
          )}
          {/* detail property */}
          <Container className="">
            <Row className="mt-5">
              <Col md={8} className="">
                <h4>{detail.name}</h4>

                <p>
                  {detail.description}
                  <br />
                  {detail.category?.kecamatan}, {detail.category?.kabupaten},{' '}
                  {detail.category?.provinsi}
                </p>
                {detail.fasilities?.map((fasility) => (
                  <Badge key={fasility.id} bg="secondary" className="me-2">
                    {fasility.name}
                  </Badge>
                ))}
                <hr className="mt-5" />
              </Col>
              <Col md={4} className=""></Col>
            </Row>
          </Container>
          {/* room head */}
          <Container key={detail.id} className="">
            <Row className=" ">
              <Col md={8} className="mb-4">
                <h4>Choose your room </h4>
              </Col>

              <Col md={4} className=""></Col>
            </Row>
          </Container>
          {/* maping room list */}
          {roomsDetail.map((val, idx) => (
            <Container key={idx} className="">
              <Row
                className="mb-4"
                style={{
                  color: val.status === 'Booked' ? '#d3d3d3' : '',
                  alignItems: 'center',
                }}
              >
                <Col md={4} className="">
                  <h5>{val.name}</h5>
                  <p
                    className=" mb-0"
                    style={{
                      color: val.status === 'Available' ? '#00b300' : '',
                    }}
                  >
                    {val.status}
                  </p>
                  <p className="fw-light  ">
                    {/* <br /> */}
                    {val.description}
                  </p>
                </Col>
                <Col md={2} className=" ">
                  <p>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(val.special_price?.price)}
                  </p>
                </Col>
                <Col md={1} className="">
                  <Button
                    onClick={() => {
                      setSelectedRooms(val);
                      handleShow();
                    }}
                    // onClick={() => {
                    //   addTransaction(val);
                    // }}
                    disabled={val.status === 'Booked'}
                  >
                    {' '}
                    Reserve
                  </Button>
                </Col>
                <Col md={4} className=""></Col>
              </Row>
            </Container>
          ))}
        </Container>
      ))}
      {/* footer */}
      <Container fluid className="sticky-stop">
        <Footer />
      </Container>
    </>
  );
}
