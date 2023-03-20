import { Row, Col, Button, Card } from 'react-bootstrap';
import { MdLocationOn } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../config/config.js';
import PropertyDetail from './propertyDetail.jsx';

function CardProperty(props) {
  const [propertys, setPropertys] = useState({ ...props.data });
  const [detail, setDetail] = useState({});
  // const [detailPropertys, setDetailPropertys] = useState({ ...props.data });
  // const [detailPropertys, setDetailPropertys] = useState([]);

  //delete propertys
  // async function delPropertys() {
  //   // alert("test")
  //   const res = await axiosInstance
  //     .post('/propertys/' + propertys.id)
  //     .then((res) => {
  //       // console.log(res);
  //       // console.log(datas);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   props.fetchdata();
  // }

  // useEffect(() => {
  //   console.log(propertys);
  // }, [propertys]);

  // useEffect(() => {
  //   fetchDetailProperty();
  //   console.log(detail);
  // }, []);

  return (
    <Row xs={1} md={2} className="g-4">
      {/* {Array.from({ length: 1 }).map((_, idx) => ( */}
      <Col>
        <Card className="" style={{ width: '16rem', cursor: 'pointer' }}>
          <Card.Img className="" variant="top" style={{ height: '16rem', objectFit: 'cover' }} src={propertys.propertyImage} />
          <Card.Body className="">
            <Card.Title>{propertys.name}</Card.Title>
            <Card.Text style={{ fontSize: '13px' }}>
              <MdLocationOn className="me-1" style={{ color: 'red' }} />
              {propertys.category.kecamatan}, {propertys.category.kabupaten}, {propertys.category.provinsi}
            </Card.Text>
            {/* <Button
              onClick={() => {
                delPropertys();
              }}
              variant="primary"
            >
              Go somewhere
            </Button> */}
          </Card.Body>
          {/* </a> */}
        </Card>
      </Col>
      {/* ))} */}
      {/* <Col>
        <Card style={{ width: '16rem' }}>
          <Card.Img variant="top" src="https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ width: '16rem' }}>
          <Card.Img variant="top" src="https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ width: '16rem' }}>
          <Card.Img variant="top" src="https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col> */}
    </Row>
  );
}

export default CardProperty;
