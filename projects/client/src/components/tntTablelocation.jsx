import { Table } from "react-bootstrap"
import ModalLocation from "./tntModalLocation";
import EditLocation from "./tntEditModal";
import React, { Fragment } from "react";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import editFormLocation from "./editLocation";
import { axiosInstance } from "../config/config";

export default function Tableaja() {

  const [propertys, setPropertys] = useState([]);

  const fetchPropertys = async () => {
    await axiosInstance.get('/propertys').then((res) => {
      // console.log(res.data.result);
      const datas = res.data.result;

      setPropertys([...datas]);
      console.log(datas);
    });
  };

  useEffect(() => {
    fetchPropertys();
  }, []);

  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  // const Property = [
  //   {
  //     //   id: "1",
  //     //   Name: "Beverly",
  //     // Lokasi: "Jalan Kenangan",
  //     Kecamatan: "Pasteur",
  //     Kabuoaten: "Subang",
  //     Provinsi: "Jawa Barat"
  //   },
  // ]

  // let history = useNavigate();

  // const handleDelete = (id) => {
  //   var index = Property.map(function (e) {
  //     return e.id
  //   }).indexOf(id);

  //   Property.splice(index, 1);

  //   history('/Location')

  // }

  return (
    <>

      <Button variant="warning" className=" d-grid gap-2 col-6 mx-auto mt-3" onClick={() => setModalShow1(true)}>
        Tambah Data
      </Button>
      {/* <Button variant="warning" className=" d-grid gap-2 col-6 mx-auto mt-3" >
        Tambah Data
      </Button> */}

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
          <Table striped bordered hover className='text-center container mt-5'>

            <thead className="bg-warning">
              <tr>
                <th>Nomor</th>
                {/* <th>Nama</th> */}
                {/* <th>Lokasi</th> */}
                <th>Kecamatan</th>
                <th>Kota/Kabupaten</th>
                <th>Provinsi</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {propertys.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    {/* <td>{item.Name}</td> */}
                    {/* <td>{item.Lokasi}</td> */}
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
                // :
                // "no data available"
              }

            </tbody>
          </Table>
        </div>
      </Fragment>


    </>


  );
}