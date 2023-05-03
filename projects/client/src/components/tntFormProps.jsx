import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useState, useEffect, axiosInstance } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Formprops({ setPropertys, onHide }) {
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            propertyImage: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("You have to fill your property's name"),
            description: Yup.string().required('Also describe your property'),
        }),
        onSubmit: async (values) => {
            try {
                const { name, description } = values
                const newProperties = await axiosInstance.post('/property', {
                    name, description
                })
                console.log(newProperties);
            } catch (error) {
                console.log(error);
            }
        }
    });

    const { values, getFieldProps, setFieldValue, handleSubmit, isSubmitting, errors, touched } = formik

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
                                <input type="text" class={`form-control ${Boolean(touched.name && errors.name) && 'is-invalid'}`} {...getFieldProps("name")} />
                                {Boolean(touched.name && errors.name) && (
                                    <div class="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div class="form-group mt-2">
                                <label for="exampleFormControlSelect1">Deskripsi</label>
                                <input type="text" class={`form-control ${Boolean(touched.description && errors.description) && 'is-invalid'}`} {...getFieldProps("description")} />
                                {Boolean(touched.description && errors.description) && (
                                    <div class="invalid-feedback">
                                        {errors.description}
                                    </div>
                                )}
                            </div>
                            <div class="mb-3">
                                <label for="formFile" class="form-label" className='mt-2'>Foto Kamar</label>
                                <input class="form-control" type="file" id="formFile" />
                            </div>
                            <div class="form-group mt-3">
                                <Button className='mt-3' variant='secondary' onClick={onHide}>Close</Button>
                                &nbsp;
                                <button type="submit" class="btn btn-primary mt-3" onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
                            </div>

                        </form>

                    </Col>
                </Row>
            </div>
        </>
    );
};