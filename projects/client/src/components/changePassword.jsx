import React, { useState, useEffect } from 'react';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';
import axios from 'axios';
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";
import { axiosInstance } from "../config/config";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Row, Form, FloatingLabel, InputGroup, FormControl, Button } from 'react-bootstrap';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const userSelector = useSelector((state) => state.auth);
  const [enable, setEnable] = useState(false);


  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const toggleOldPasswordVisiblity = () => {
    setOldPasswordShown(oldPasswordShown ? false : true);
  };
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const toggleNewPasswordVisiblity = () => {
    setNewPasswordShown(newPasswordShown ? false : true);
  };
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };


  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required("Password wajib diisi!"),
      newPassword: Yup.string()
        .required("Password wajib diisi!")
        .min(5, "Minimal terdapat 5 digit"),
      confirmPassword: Yup.string()
        .required("Passwords harus sama")
        .oneOf([Yup.ref("newPassword"), null], "Passwords harus sama"),
    }),

    onSubmit: async (values) => {

      console.log(values);

      if (newPassword !== confirmPassword) {
        setErrorMessage("New password and confirm password do not match");
        return;
      }
      try {
        const response = await axiosInstance.patch(
          `/auth/changePassword`,
          {
            oldPassword : values.oldPassword,
            newPassword : values.newPassword,
          }
          
          
        );
        navigate("/");
        
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setErrorMessage("Failed to change password");
      }

    }
  });



  useEffect(() => {
    let { oldPassword, newPassword, confirmPassword } = formik.values;
    if (!oldPassword || !newPassword || !confirmPassword) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [formik.values]);

  
  return (
    <>


<Container fluid className='color-overlay d-flex justify-content-center align-items-center'> 
    <Row className='shadow-lg jarak sm' style={{width: '500px'}}>

      <h2>Change Password</h2>
      

      <Form className="d-grid gap-1">
        <InputGroup id='OldPass'>
          <FloatingLabel controlId='floatingOldPass' label='Old Password'>
            <FormControl 
                name='OldPass' 
                {...formik.getFieldProps('oldPassword')}
                type={oldPasswordShown ? 'text' : 'password'}  >
            </FormControl>
          </FloatingLabel>
          <InputGroup.Text id="basic-addon2" onClick={toggleOldPasswordVisiblity}>
                      {oldPasswordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </InputGroup.Text>
        </InputGroup>
        {formik.errors.oldPassword}

        <InputGroup id='NewPass'>
          <FloatingLabel controlId='floatingOldPass' label='New Password'>
            <FormControl 
                name='NewPass' 
                {...formik.getFieldProps('newPassword')} 
                type={newPasswordShown ? 'text' : 'password'}>
            </FormControl>
          </FloatingLabel>
          <InputGroup.Text id="basic-addon2" onClick={toggleNewPasswordVisiblity}>
                      {newPasswordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </InputGroup.Text>
        </InputGroup>
        {formik.errors.newPassword}

        <InputGroup id='ConfirmPass'>
          <FloatingLabel controlId='floatingOldPass' label='ConfirmPassword'>
            <FormControl 
                name='ConfirmPass' 
                {...formik.getFieldProps('confirmPassword')} 
                type={confirmPasswordShown ? 'text' : 'password'} >
            </FormControl>
          </FloatingLabel>
          <InputGroup.Text id="basic-addon2" onClick={toggleConfirmPasswordVisiblity}>
                      {confirmPasswordShown ? <BsFillEyeFill />: <BsFillEyeSlashFill />}
          </InputGroup.Text>
        </InputGroup>
        {formik.errors.confirmPassword}

        <Button onClick={formik.handleSubmit} type="submit" style={{ background: '#f4ebd0', color: 'black', borderStyle:'none' }}>Change Password</Button>
        
      </Form>
      {message && <p>{message}</p>}

    </Row>
    </Container>
  </>
  );
}

export default ChangePassword;