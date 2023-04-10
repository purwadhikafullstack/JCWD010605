import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useState, useEffect, axiosInstance } from 'react';

export default function EditFormprops(props) {
    const [propertys, setPropertys] = useState([]);

    const fetchPropertys = async () => {
      try {
        const { data } = await axiosInstance.get('./propertys')
        setPropertys([...data.result])
      } catch (error) {
        console.log(error);
      }
  
    };
  
    useEffect(() => {
      fetchPropertys();
    }, []);

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
           
                    <form>
                  
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
                        <div class="form-group mt-3">
                            <Button className='mt-3' variant='secondary' onClick={props.onHide}>Close</Button>
                            &nbsp;
                            <button type="submit" class="btn btn-primary mt-3">Submit</button>
                        </div>
                      
                    </form>
                     
                </Col>
            </Row>
        </div>
        </>
    );
};