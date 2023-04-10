import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

export default function EditFormLocation(props) {

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
                        <div class="form-group">
                            <label >Kecamatan</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group mt-2">
                            <label for="exampleFormControlSelect1">Kabupaten</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group mt-3">
                            <label for="exampleFormControlTextarea1">Provinsi</label>
                            <input type="text" class="form-control" />
                            <Button className='mt-3' variant='secondary' onClick={props.onHide}>Close</Button>
                            &nbsp;
                            <button type="submit" class="btn btn-primary mt-3">Update</button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    );
};