import Modal from 'react-bootstrap/Modal';
import React from "react";
import Formprops from './tntFormProps';


export default function ModalProp({ show, onHide, setPropertys }) {

    return (

        <Modal
            show={show}
            onHide={onHide}

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
                <Formprops setPropertys={setPropertys} onHide={onHide}/>
            </Modal.Body>

        </Modal>
    );
};
