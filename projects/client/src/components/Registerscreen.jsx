import React, { useState, useEffect } from 'react';

import { Form, Button, Container, FloatingLabel, InputGroup } from 'react-bootstrap';

// import '../css/Registerscreen.css';
// import { BsFillEnvelopeFill } from 'react-icons/bs';
// import { BsFillPersonFill } from 'react-icons/bs';
// import { BsFillKeyFill } from 'react-icons/bs';
// import { BsFillLockFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';
// import { BiMaleFemale } from 'react-icons/bi';
// import { BiPhone } from 'react-icons/bi';
// import { BsFillEyeFill } from 'react-icons/bs';
// import { BsFillEyeFill } from 'react-icons/bs';
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
      // phoneNumber: '',
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
      // phoneNumber: Yup.string().required('phone number tidak boleh kosong'),
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
          alert('User registered');
          // setStatus('success');
          // setMsg('Data inserted');
        })
        .catch((error) => {
          console.log(error);
          // setStatus('error');
          // setMsg(error.response.data.message);
        });
      // console.log(res.data);
    },
  });

  return (
    <>
      <Container>
        <Form className="d-grid gap-1">
          <Form.Group className="mb-3" id="name" controlId="formGroupName">
            <FloatingLabel controlId="floatingName" label="Name">
              <Form.Control name="name" onChange={(e) => formik.setFieldValue('name', e.target.value)} type="name" placeholder="Enter Name" />
            </FloatingLabel>
          </Form.Group>
          {formik.errors.name}
          <Form.Group className="mb-3" id="email" controlId="formGroupEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <FloatingLabel controlId="floatingEmail" label="Email">
              <Form.Control name="email" onChange={(e) => formik.setFieldValue('email', e.target.value)} type="email" placeholder="Enter email" />
            </FloatingLabel>
          </Form.Group>
          {formik.errors.email}

          <InputGroup id="password" className="mt-3" controlId="formGroupPassword">
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
        </Form>
        <Button className="mt-4" onClick={formik.handleSubmit} bg={'#0095F6'} color={'white'}>
          Register
        </Button>
      </Container>
    </>
    // <div className="wrapper h-full color">
    //   <div className="row justify-content-center ">
    //     <div className="col-md-5">
    //       <div className="shadow-lg jarak mt-5 bg-light">
    //         <h2>Register</h2>

    //         <form onSubmit={handleSubmit} className="d-grid gap-2">
    //           <div className="form-group input-group">
    //             <div className="input-group-text">
    //               <BsFillPersonFill />
    //             </div>
    //             <input className={errors.fullName && touched.fullName ? ' input-error form-control' : 'form-control'} value={values.fullName} onChange={handleChange} onBlur={handleBlur} id="fullName" placeholder="Full Name" type="text" />
    //           </div>
    //           {errors.fullName && touched.fullName && <p className="error my-0">{errors.fullName}</p>}

    //           <div className="form-group input-group">
    //             <div className="input-group-prepend"></div>
    //             <div className="input-group-text">
    //               <BsFillEnvelopeFill />
    //             </div>
    //             <input className={errors.email && touched.email ? ' input-error form-control' : 'form-control'} value={values.email} onChange={handleChange} onBlur={handleBlur} id="email" placeholder="Email Address" type="email" />
    //           </div>
    //           {errors.email && touched.email && <p className="error my-0">{errors.email}</p>}

    //           <div className="form-group input-group">
    //             <div className="input-group-prepend"></div>
    //             <div className="input-group-text">
    //               <BsFillKeyFill />
    //             </div>
    //             <input
    //               type={passwordShown ? 'text' : 'password'}
    //               id="password"
    //               placeholder="Password"
    //               className={errors.password && touched.password ? ' input-error form-control' : 'form-control'}
    //               value={values.password}
    //               onChange={handleChange}
    //               onBlur={handleBlur}
    //             />
    //             <div className="input-group-text" onClick={togglePasswordVisiblity}>
    //               {passwordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
    //             </div>
    //           </div>
    //           {errors.password && touched.password && <p className="error my-0">{errors.password}</p>}

    //           <div className="form-group input-group">
    //             <div className="input-group-prepend"></div>
    //             <div className="input-group-text">
    //               <BsFillLockFill />
    //             </div>
    //             <input
    //               type={conPasswordShown ? 'text' : 'password'}
    //               placeholder="Confirm Password"
    //               id="confirmPassword"
    //               className={errors.confirmPassword && touched.confirmPassword ? ' input-error form-control' : 'form-control'}
    //               value={values.confirmPassword}
    //               onChange={handleChange}
    //               onBlur={handleBlur}
    //             />
    //             <div className="input-group-text" onClick={toggleConPasswordVisiblity}>
    //               {conPasswordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
    //             </div>
    //           </div>
    //           {errors.confirmPassword && touched.confirmPassword && <p className="error my-0">{errors.confirmPassword}</p>}

    //           <div className="form-group input-group">
    //             <div className="input-group-text">
    //               <BiPhone />
    //             </div>
    //             <input
    //               id="phoneNumber"
    //               placeholder="Phone Number"
    //               type="text"
    //               className={errors.phoneNumber && touched.phoneNumber ? ' input-error form-control' : 'form-control'}
    //               value={values.phoneNumber}
    //               onChange={handleChange}
    //               onBlur={handleBlur}
    //             />
    //           </div>
    //           {errors.phoneNumber && touched.phoneNumber && <p className="error my-0">{errors.phoneNumber}</p>}

    //           <div className="form-group input-group">
    //             <div className="input-group-text">
    //               <BiMaleFemale />
    //             </div>
    //             <Form.Select aria-label="select-gender" className={errors.gender && touched.gender ? ' input-error form-control' : 'form-control'} onSelect={handleChange} onBlur={handleBlur}>
    //               <option>Select Gender</option>
    //               <option value={values.gender}>Male</option>
    //               <option value={values.gender}>Female</option>
    //             </Form.Select>
    //           </div>
    //           {errors.gender && touched.gender && <p className="error my-0">{errors.gender}</p>}

    //           <div className="form-group">
    //             <button type="submit" className="btn btn-primary btn-block">
    //               {' '}
    //               Create Account{' '}
    //             </button>
    //           </div>
    //           <p className="text-center">
    //             Have an account? <a href="">Log In</a>{' '}
    //           </p>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Registerscreen;
