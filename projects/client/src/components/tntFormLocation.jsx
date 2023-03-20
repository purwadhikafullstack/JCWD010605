import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { axiosInstance } from '../config/config'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export default function FormLocation() {

    const [kecamatan, setKecamatan] = useState("")
    const [kabupaten, setKabupaten] = useState("")
    const [provinsi, setProvinsi] = useState("")
    const navigate = useNavigate();

    const saveLocation = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/propertys', {
                kecamatan,
                kabupaten,
                provinsi
            });
            navigate("/Location")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className=" container mt-2" >

                <Row>
                    <Col>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <form onSubmit={saveLocation}>
                            {/* <div class="form-group">
                            <label for="exampleInputEmail1">Nama</label>
                            <input type="text" class="form-control" name='nama' />
                        </div> */}
                            {/* <div class="form-group">
                            <label for="exampleInputPassword1">Alamat Lokasi</label>
                            <input type="text" class="form-control" />
                        </div> */}
                            <div class="form-group">
                                <label >Kecamatan</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={kecamatan}
                                    onChange={(e) => setKecamatan(e.target.value)} />
                            </div>
                            <div class="form-group mt-2">
                                <label for="exampleFormControlSelect1">Kabupaten</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={kabupaten}
                                    onChange={(e) => setKabupaten(e.target.value)} />
                                {/* <select class="form-control" id="exampleFormControlSelect1">
                                <option selected>Pilih Tipe Kamar</option>
                                <option>Studio</option>
                                <option>Apartement</option>
                            </select> */}
                            </div>
                            <div class="form-group mt-3">
                                <label for="exampleFormControlTextarea1">Provinsi</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={provinsi}
                                    onChange={(e) => setProvinsi(e.target.value)} />
                                {/* <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
                                <button type="submit" class="btn btn-primary mt-3">Submit</button>
                            </div>
                            {/* <div class="mt-2">
                            <label for="formFile" class="form-label">Foto Bangunan</label>
                            <input class="form-control" type="file" id="formFile" />
                        </div> */}

                        </form>
                    </Col>
                </Row>



            </div>
        </>
    )
}