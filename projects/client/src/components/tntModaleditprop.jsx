import Modal from 'react-bootstrap/Modal';
import React from "react";
import EditFormprops from './tntEditFormprops';


export default function EditProps(props) {

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
                <EditFormprops />
            </Modal.Body>

        </Modal>
    );
};