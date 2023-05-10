import { Table } from "react-bootstrap"
import ModalLocation from "./tntModalLocation";
import EditLocation from "./tntEditModal";
import React, { Fragment } from "react";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { axiosInstance } from "../config/config";
import NavbarTop from "./navbar"

export default function Tableaja() {

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    await axiosInstance.get('/categories').then((res) => {
      const datas = res.data.result;

      setCategories([...datas]);
      console.log(datas);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  return (
    <>
      <NavbarTop />
      <Button style={{ background: '#b68d40', border: 'none' }} className=" d-grid gap-2 col-6 mx-auto mt-4" onClick={() => setModalShow1(true)}>
        Tambah Data Lokasi
      </Button>

      <ModalLocation
        show={modalShow1}
        onHide={() => setModalShow1(false)}
      />

      <EditLocation
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />

      <Fragment>
        <div style={{ margin: "2rem" }}>
          <Table striped bordered hover className='text-center container mt-3'>

            <thead style={{ background: '#f4ebd0' }}>
              <tr>
                <th>Kecamatan</th>
                <th>Kota/Kabupaten</th>
                <th>Provinsi</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.kecamatan}</td>
                    <td>{item.kabupaten}</td>
                    <td>{item.provinsi}</td>
                    <td>
                      <Button onClick={() => setModalShow2(true)}>Edit</Button>
                      &nbsp;
                      <Button variant="danger" onClick={() => alert(item.id)}> Delete</Button>
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