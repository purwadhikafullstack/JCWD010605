import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';

export default function FormLocation(props) {

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
                            </div>
                            <div class="form-group mt-3">
                                <label for="exampleFormControlTextarea1">Provinsi</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={provinsi}
                                    onChange={(e) => setProvinsi(e.target.value)} />
                                {/* <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
                                <Button className='mt-3' variant='secondary' onClick={props.onHide}>Close</Button>
                                &nbsp;
                                <button type="submit" class="btn btn-primary mt-3">Submit</button>

                            </div>
                        </form>
                    </Col>
                </Row>



            </div>
        </>
    )
}