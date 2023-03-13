import { Row, Col, Button, Card } from 'react-bootstrap';
import { MdLocationOn } from 'react-icons/md';
import { useState } from 'react';

function CardProperty(props) {
  const [propertys, setPropertys] = useState({ ...props.data });
  // const [cat, setCat] = useState({ ...props.data.categories });
  // console.log(propertys.categories.provinsi);

  return (
    <Row xs={1} md={4} className="">
      <Col>
        <Card style={{ width: '16rem' }}>
          <Card.Img className="" variant="top" style={{ height: '16rem', objectFit: 'cover' }} src={propertys.propertyImage} />
          <Card.Body className="">
            <Card.Title>{propertys.name}</Card.Title>
            <Card.Text style={{ fontSize: '13px' }}>
              <MdLocationOn className="me-1" style={{ color: 'red' }} />
              {propertys.category.kecamatan}, {propertys.category.kabupaten}, {propertys.category.provinsi}
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      </Col>
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
