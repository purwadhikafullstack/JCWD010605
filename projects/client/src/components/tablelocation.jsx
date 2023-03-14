import { Table } from "react-bootstrap"
import ModalForm from "./modal";
import React, { Fragment } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

export default function Tableaja() {

  const [modalShow, setModalShow] = React.useState(false);

  const Property = [
    {
      id: "1",
      Name: "Beverly",
      Lokasi: "Jalan Kenangan",
      Tipe: "Studio",
      Harga: "Rp. 500000",
      Deskripsi: "1 kamar, bed king size"
    }, {
      id: "2",
      Name: "Kedaton",
      Lokasi: "Jalan Bahagia",
      Tipe: "Apartement",
      Harga: "Rp. 600000",
      Deskripsi: "2 kamar, 1 bed king size, 1 bed queen size"
    }, {
      id: "3",
      Name: "Jaya",
      Lokasi: "Jalan Indah",
      Tipe: "Studio",
      Harga: "Rp. 300000",
      Deskripsi: "1 kamar, 1 bed queen size"
    },
  ]

  let history = useNavigate();

  const handleDelete = (id) => {
    var index = Property.map(function (e) {
      return e.id
    }).indexOf(id);

    Property.splice(index, 1);

    history('/Location')

  }

  return (
    <>

      <Button variant="warning" className=" d-grid gap-2 col-6 mx-auto mt-3" onClick={() => setModalShow(true)}>
        Tambah Data
      </Button>

      <ModalForm
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <Fragment>
        <div style={{ margin: "2rem" }}>
          <Table striped bordered hover className='text-center container mt-5'>

            <thead className="bg-warning">
              <tr>
                <th>Nomor</th>
                <th>Nama</th>
                <th>Lokasi</th>
                <th>Tipe Kamar</th>
                <th>Harga</th>
                <th>Deskripsi</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                Property && Property.length > 0
                  ?
                  Property.map((item) => {
                    return (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.Name}</td>
                        <td>{item.Lokasi}</td>
                        <td>{item.Tipe}</td>
                        <td>{item.Harga}</td>
                        <td>{item.Deskripsi}</td>
                        <td>
                          <Button onClick={() => alert(item.id)} > Edit</Button>
                          &nbsp;
                          <Button variant="danger" onClick={() => handleDelete(item.id)}> Delete</Button>
                        </td>
                      </tr>
                    )
                  })
                  :
                  "no data available"
              }

            </tbody>
          </Table>
        </div>
      </Fragment>


    </>


  );
}