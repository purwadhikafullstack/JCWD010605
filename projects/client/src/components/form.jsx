import { Row, Col } from 'react-bootstrap'

export default function FormLocation() {

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
                            <label for="exampleInputEmail1">Nama</label>
                            <input type="text" class="form-control" name='nama' />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Alamat Lokasi</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label >Harga Kamar</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group mt-2">
                            <label for="exampleFormControlSelect1">Tipe Kamar</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                                <option selected>Pilih Tipe Kamar</option>
                                <option>Studio</option>
                                <option>Apartement</option>
                            </select>
                        </div>
                        <div class="form-group mt-3">
                            <label for="exampleFormControlTextarea1">Deskripsi Kamar</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="mt-2">
                            <label for="formFile" class="form-label">Foto Kamar</label>
                            <input class="form-control" type="file" id="formFile" />
                        </div>

                    </form>
                </Col>
            </Row>



        </div>
    )
}