import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Input,
  Alert,
} from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { axiosInstance } from '../config/config.js';
import NavbarTop from './navbar';
import Footer from './footer';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function BookingList() {
  const [bookingList, setBookingList] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  // const inputFileRef = useRef(null);

  // const [imgSelected, setImgSelected] = useState('');

  const [show, setShow] = useState(false);

  const handleShow = (roomId) => {
    setRoomId(roomId);
    setShow(true);
  };

  const MAX_FILE_SIZE = 1024000; //1MB

  const validFileExtensions = {
    image: ['jpg', 'jpeg', 'png'],
  };

  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
    );
  }

  const formik = useFormik({
    initialValues: {
      image_url: selectedFile,
      image_preview: null,
    },
    validationSchema: Yup.object().shape({
      image_url: Yup.mixed()
        .test('is-valid-type', 'Not a valid image type', (value) =>
          isValidFileType(value && value.name.toLowerCase(), 'image')
        )
        .test(
          'is-valid-size',
          'Max allowed size is 1MB',
          (value) => value && value.size <= MAX_FILE_SIZE
        )
        .required('image tidak boleh kosong'),
    }),
    onSubmit: async (val) => {
      const { image_url } = val;
      const formData = new FormData();
      formData.append('room_id', roomId);
      formData.append('image_url', image_url);

      console.log(formData);
      await axiosInstance
        .post(`/propertys/paymentup`, formData)
        .then(async (res) => {
          const datas = res.data.result;
          alert('Payment proof uploaded successfully');
          handleClose();
          console.log(datas);
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(formData);
    },
  });

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);
    formik.setFieldValue('image_preview', url);
    formik.setFieldValue('image_url', event.target.files[0]);
    // console.log(event.target.files[0])
  };

  const handleClose = () => {
    formik.setFieldValue('image_preview', null);
    formik.setFieldValue('image', null);
    setShow(false);
  };

  const fetchBookingList = async () => {
    await axiosInstance
      .get('/propertys/bookinglist')
      .then((res) => {
        // console.log(res.data.result);
        const datas = res.data.result;

        setBookingList([...datas]);
        console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelBook = async (room_id) => {
    const confirmCancelation = window.confirm(
      'Are you sure you want to cancel booking?'
    );

    if (confirmCancelation) {
      await axiosInstance
        .post('/propertys/cancel', { room_id })
        .then((res) => {
          const cancelledTransaction = res.data.result;
          // console.log(cancelledTransaction);

          setCanceled([...canceled, cancelledTransaction]);
          window.location.reload(); // Reload the page
          // console.log(res.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchBookingList();
    console.log(selectedFile);
  }, []);

  return (
    <>
      <NavbarTop />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-danger">{formik.errors.image_url}</div>

          <input type="file" onChange={handleFile} />
          <img
            src={formik.values.image_preview}
            style={{ height: '200px' }}
            alt=""
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row className="mt-5 mb-4 text-center">
          <Col>
            <h4>Booking List</h4>
          </Col>
        </Row>
        <Row className="text-center">
          <Col md={2}>
            <h6>Room Name</h6>
          </Col>
          <Col md={3}>
            <h6>Property Name</h6>
          </Col>
          <Col md={3}>
            <h6>Booking Status</h6>
          </Col>
          <Col md={2}>
            <h6>Upload Payment Proof</h6>
          </Col>
          <Col md={2}>
            <h6>Cancel Booking</h6>
          </Col>
          <hr className="my-3 " />
        </Row>
        {bookingList.map((val, idx) => (
          <Row
            key={idx}
            className=" text-center"
            style={{
              color: val.order_status === 'Dibatalkan' ? '#b3b3b3' : '',
            }}
          >
            <Col md={2}>{val.room?.name}</Col>
            <Col md={3}>{val.room?.property?.name}</Col>
            <Col md={3}>{val.order_status}</Col>
            <Col md={2}>
              <Button
                disabled={val.order_status === 'Dibatalkan'}
                onClick={() => {
                  handleShow(val.room_id);
                }}
              >
                Upload
              </Button>
            </Col>
            <Col md={2}>
              <Button
                onClick={() => {
                  cancelBook(val.room_id);
                }}
                disabled={
                  val.order_status === 'Dibatalkan' ||
                  val.order_status === 'Menunggu Konfirmasi Pembayaran'
                }
              >
                Cancel
              </Button>
            </Col>
            <hr className="my-3" />
          </Row>
        ))}
      </Container>
      <Container fluid className="sticky-stop">
        <Footer />
      </Container>
    </>
  );
}
