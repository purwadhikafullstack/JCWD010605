import { Container, Row, Col, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/config.js';
import NavbarTop from './navbar';

export default function BookingList() {
  const [bookingList, setBookingList] = useState([]);

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

  useEffect(() => {
    fetchBookingList();
  }, []);

  return (
    <>
      <NavbarTop />

      <Container>
        <Table className="">
          <thead className="" style={{ color: 'white', backgroundColor: 'black' }}>
            <tr>
              <th md={2}>Room Name</th>
              <th md={4}>Property Name</th>
              <th md={4}>Booking Status</th>
            </tr>
          </thead>
          {bookingList.map((book) => (
            <tbody key={book.id}>
              <tr>
                <td>{book.room?.name}</td>
                <td>{book.room?.property?.name}</td>
                <td>{book.order_status}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    </>
  );
}
