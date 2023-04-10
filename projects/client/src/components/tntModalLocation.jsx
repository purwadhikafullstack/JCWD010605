import Modal from 'react-bootstrap/Modal';
import React from "react";
import FormLocation from './tntFormLocation';


export default function ModalLocation(props) {

    return (

        <Modal
            {...props}

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton style={{ background: '#f4ebd0' }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tambah Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Isi Data Kamar yang Ingin Diswewakan</h4>
                <FormLocation />
            </Modal.Body>

        </Modal>
    );
};
