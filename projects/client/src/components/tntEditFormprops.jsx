import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

export default function EditFormprops(props) {

    return (
        <div className=" container mt-2" >

            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    <form>
                        {/* <div class="form-group">
                            <label for="exampleInputEmail1">Nama</label>
                            <input type="text" class="form-control" name='nama' />
                        </div> */}
                        <div class="form-group">
                            <label >Nama</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group mt-2">
                            <label for="exampleFormControlSelect1">Deskripsi</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label" className='mt-2'>Foto Kamar</label>
                            <input class="form-control" type="file" id="formFile" />
                        </div>
                        <div>
                            <select class="form-select" aria-label="Default select example">c
                                <option selected>Pilih Tipe Kamar</option>
                                <option value="1">VIP</option>
                                <option value="2">Luxury</option>
                                <option value="3">Standar</option>
                            </select>
                        </div>
                        <div class="form-group mt-3">
                            {/* <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
                            <Button className='mt-3' variant='secondary' onClick={props.onHide}>Close</Button>
                            &nbsp;
                            <button type="submit" class="btn btn-primary mt-3">Submit</button>
                        </div>
                    </form>
                </Col>
            </Row>


        </div>
    )
}