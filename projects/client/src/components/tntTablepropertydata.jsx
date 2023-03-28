import { Table } from "react-bootstrap"
import ModalProp from "./tntModalProps";
// import EditLocation from "./tntEditModal";
import React, { Fragment } from "react";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { axiosInstance } from "../config/config";
import NavbarTop from "./navbar"
import EditProps from "./tntModaleditprop";

export default function Tableproperty() {

  const [propertys, setPropertys] = useState([]);



  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  return (
    <>
      <NavbarTop />
      <Button style={{ background: '#b68d40' }} className=" d-grid gap-2 col-6 mx-auto mt-4" onClick={() => setModalShow1(true)}>
        Tambah Data Properti
      </Button>

      <ModalProp
        show={modalShow1}
        onHide={() => setModalShow1(false)}
      />

      <EditProps
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />

      <Fragment>
        <div style={{ margin: "2rem" }}>
          <Table striped bordered hover className='text-center container mt-3'>

            <thead style={{ background: '#f4ebd0' }}>
              <tr>
                {/* <th>Nomor</th> */}
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Gambar Hotel</th>
                <th>Tipe</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {propertys.map((item, index) => {
                return ( */}
                  <tr>
                    <td>Hotel Beverly</td>
                    <td>1 kingsize, ac, tv</td>
                    <td>no Image</td>
                    <td>VIP</td>
                    <td>
                      <Button onClick={() => setModalShow2(true)}>Edit</Button>
                      &nbsp;
                      <Button variant="danger" onClick={() => (alert)}> Delete</Button>
                    </td>
                  </tr>
                {/* )
              })
              }; */}

            </tbody>
          </Table>
        </div>
      </Fragment>


    </>


  );
}