import Modal from 'react-bootstrap/Modal';
import React from "react";
import EditFormLocation from './tntEditLocation';


export default function EditLocation(props) {

    return (


        <Modal
            {...props}

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >

            <Modal.Header closeButton style={{ background: '#f4ebd0' }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Edit Data Kamar yang Ingin Diswewakan</h4>
                <EditFormLocation />
            </Modal.Body>

        </Modal>
    );
};