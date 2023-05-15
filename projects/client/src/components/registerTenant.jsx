import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../config/config';

const RegisterTenantForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      address: '',
      phone_number: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nama harus diisi'),
      email: Yup.string().email('Alamat email tidak valid').required('Alamat email harus diisi'),
      password: Yup.string().required('Kata sandi harus diisi'),
      address: Yup.string().required('Alamat harus diisi'),
      phone_number: Yup.string()
        .matches(/^\d+$/, 'Nomor telepon harus berupa angka')
        .required('Nomor telepon harus diisi')
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      axiosInstance
        .post('/auth/register-tenant', values)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setSubmitting(false);
          resetForm();
        });
    }
  });

  return (

    <Container fluid className='color-overlay d-flex justify-content-center align-items-center'>       
        <Row className='shadow-lg jarak mt-5 bg-light'>
            <h2>Create Account</h2>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.name && !!formik.errors.name}
                    isValid={formik.touched.name && !formik.errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Alamat Email</Form.Label>
                    <Form.Control
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    isValid={formik.touched.email && !formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Kata Sandi</Form.Label>
                    <Form.Control
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    isValid={formik.touched.password && !formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="address">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.address && !!formik.errors.address}
                    isValid={formik.touched.address && !formik.errors.address}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="phone_number">
                    <Form.Label>Nomor Telepon</Form.Label>
                    <Form.Control
                    type="text"
                    name="phone_number"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.phone_number && !!formik.errors.phone_number}
                    isValid={formik.touched.phone_number && !formik.errors.phone_number}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.phone_number}</Form.Control.Feedback>
                </Form.Group>

            <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Mendaftar...' : 'Daftar'}
            </Button>
            </Form>
        </Row>
    </Container>
);
};

export default RegisterTenantForm;