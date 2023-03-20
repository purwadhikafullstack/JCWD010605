import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import EditFormLocation from './tntEditLocation';


export default function EditLocation(props) {

    return (


        <Modal
            {...props}

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className='bg-warning'>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Isi Data Kamar yang Ingin Diswewakan</h4>
                <EditFormLocation />
            </Modal.Body>
            <Modal.Footer>

                <Button variant='secondary' onClick={props.onHide}>Close</Button>
                <button type="submit" class="btn btn-primary">Update</button>

            </Modal.Footer>
        </Modal>
    );
}
