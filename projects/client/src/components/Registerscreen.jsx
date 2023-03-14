import React, { useState, useEffect } from 'react';
import { Form, Button, Container, FloatingLabel, InputGroup } from 'react-bootstrap';
import '../css/Registerscreen.css';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';
import { axiosInstance } from '../config/config.js';

function Registerscreen() {
  YupPassword(Yup);

  // const [status, setStatus] = useState('');
  // const [msg, setMsg] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [conPasswordShown, setConPasswordShown] = useState(false);
  const toggleConPasswordVisiblity = () => {
    setConPasswordShown(conPasswordShown ? false : true);
  };

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: '',
      email: '',
      password: '',
      phone_number: '',
      // gender: '',
      // birthDate: '',
      // profilImage: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('nama tidak boleh kosong').min(3, 'min 3 huruf'),
      email: Yup.string().required('email tidak boleh kosong').email('ini bukan email'),
      password: Yup.string().required('password tidak boleh kosong').minLowercase(1, 'min 1 huruf kecil').minNumbers(1, 'min 1 angka').minUppercase(1, 'min 1 huruf besar').min(5, 'min 5 digit'),
      confirmPassword: Yup.string()
        .required('password must match')
        .oneOf([Yup.ref('password'), null], 'password must match'),
      phone_number: Yup.string().required('phone number tidak boleh kosong'),
      // gender: Yup.string().required('gender tidak boleh kosong'),
      // birthDate: Yup.string().required('birthdate tidak boleh kosong'),
      // profilImage: Yup.string().required('profil image tidak boleh kosong'),
    }),
    onSubmit: async () => {
      // alert("test")
      const res = await axiosInstance
        .post('/auth/v1', formik.values)
        .then((res) => {
          console.log(res.data);
          alert('registrasi berhasil!')
          // setStatus('success');
          // setMsg('Data inserted');
        })
        .catch((error) => {
          console.log(error);
          alert('akun sudah terdaftar!')
          // setStatus('error');
          // setMsg(error.response.data.message);
        });
      // console.log(res.data);
    },
  });

  return (
    <>
      <Container className='wrapper mt-5 '> 
        <Container className='row justify-content-center'> 
          <Container className='col md-5' >
            <Container className='shadow-lg jarak mt-5 bg-light'>
              <h2>Create Account</h2>

          
                <Form className="d-grid gap-1">
                  <Form.Group className="mb-3" id="name" controlId="formGroupName">
                    <FloatingLabel controlId="floatingName" label="Name">
                      <Form.Control name="name" onChange={(e) => formik.setFieldValue('name', e.target.value)} type="name" placeholder="Enter Name" />
                    </FloatingLabel>
                    {formik.errors.name}

                  </Form.Group>
                  <Form.Group className="mb-3" id="email" controlId="formGroupEmail">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <FloatingLabel controlId="floatingEmail" label="Email">
                      <Form.Control name="email" onChange={(e) => formik.setFieldValue('email', e.target.value)} type="email" placeholder="Enter email" />
                    </FloatingLabel>
                    {formik.errors.email}
                  </Form.Group>

                  <InputGroup id="password" controlId="formGroupPassword">
                    <FloatingLabel controlId="floatingPassword" label="Password">
                      <Form.Control name="password" onChange={(e) => formik.setFieldValue('password', e.target.value)} type={passwordShown ? 'text' : 'password'} placeholder="Password" />
                    </FloatingLabel>
                    <InputGroup.Text id="basic-addon2" onClick={togglePasswordVisiblity}>
                      {passwordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                    </InputGroup.Text>
                  </InputGroup>
                  {formik.errors.password}
                  <InputGroup className="mt-3">
                    {/* <Form.Label>Confirm Password</Form.Label> */}
                    <FloatingLabel controlId="floatingConfirmPassword" label="ConfirmPassword">
                      <Form.Control name="password" onChange={(e) => formik.setFieldValue('confirmPassword', e.target.value)} type={conPasswordShown ? 'text' : 'password'} placeholder="Confirm Password" />
                    </FloatingLabel>
                    <InputGroup.Text id="basic-addon2" onClick={toggleConPasswordVisiblity}>
                      {conPasswordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                    </InputGroup.Text>
                  </InputGroup>
                  {formik.errors.confirmPassword}

                  <InputGroup className="mt-3">
                    <FloatingLabel controlId="floatingPhoneNumber" label="PhoneNumber">
                    <Form.Control name="phone_number" onChange={(e) => formik.setFieldValue('phone_number', e.target.value)} type="text" placeholder="Enter phone number" />
                    </FloatingLabel>
                  </InputGroup>
                    {formik.errors.phone_number}
                  </Form>
                  <Button className="mt-4" onClick={formik.handleSubmit}  bg={'#0095F6'} color={'white'}>
                  Register
                  </Button>
                  
                

            </Container>
          </Container> 
        </Container>
      </Container>
    </>
    
  );
}

export default Registerscreen;
