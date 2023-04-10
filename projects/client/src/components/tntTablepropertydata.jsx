import { Table } from "react-bootstrap"
import ModalProp from "./tntModalProps";
import React, { Fragment } from "react";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { axiosInstance } from "../config/config";
import NavbarTop from "./navbar"
import EditProps from "./tntModaleditprop";

export default function Tableproperty() {

  const [propertys, setPropertys] = useState([]);

  const fetchPropertys = async () => {
    try {
      const { data } = await axiosInstance.get('/propertys')
      setPropertys([...data.result])
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchPropertys();
  }, []);

  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  return (
    <>
      <NavbarTop />
      <Button style={{ background: '#b68d40', border: 'none' }} className=" d-grid gap-2 col-6 mx-auto mt-4" onClick={() => setModalShow1(true)}>
        Tambah Data Properti
      </Button>

      <ModalProp
        show={modalShow1}
        onHide={() => setModalShow1(false)}
        setPropertys={setPropertys}
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
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Gambar Hotel</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {propertys.map((item, index) => {
                return (
                  <tr key={item.id} style={{ textAlign: "center" }}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <img style={{ objectFit: "cover", height: "50px" }} src={item.propertyImage} />
                    </td>
                    <td>
                      <Button onClick={() => setModalShow2(true)}>Edit</Button>
                      &nbsp;
                      <Button variant="danger" onClick={() => (alert)}> Delete</Button>
                    </td>
                  </tr>
                )
              })
              };
            </tbody>
          </Table>
        </div>
      </Fragment>
    </>
  );
};