import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import FormLocation from './form';


export default function ModalForm(props) {

    return (


        <Modal
            {...props}

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className='bg-warning'>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tambah Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Isi Data Kamar yang Ingin Diswewakan</h4>
                <FormLocation />
            </Modal.Body>
            <Modal.Footer>

                <Button variant='secondary' onClick={props.onHide}>Close</Button>
                <button type="submit" class="btn btn-primary">Submit</button>

            </Modal.Footer>
        </Modal>
    );
}
