import { Table } from "react-bootstrap"
import ModalForm from "./modal";
import React from "react";
import Button from 'react-bootstrap/Button';

export default function Tableaja() {

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>

      <Button variant="warning" className=" d-grid gap-2 col-6 mx-auto mt-3" onClick={() => setModalShow(true)}>
        Tambah Data
      </Button>

      <ModalForm
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Table striped bordered hover className='container mt-5'>

        <thead className="bg-warning">
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Lokasi</th>
            <th>Tipe Kamar</th>
            <th>Harga</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Beverly Hotel</td>
            <td>Jalan Sariasih no 40</td>
            <td>Studio</td>
            <td>Rp.400.000</td>
            <td>image</td>
          </tr>
        </tbody>
      </Table>

    </>


  );
}