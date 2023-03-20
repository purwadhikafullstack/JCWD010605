import React, { useState, useEffect } from 'react';
import { Form, Button, Container, FloatingLabel, InputGroup, Row } from 'react-bootstrap';
// import '../css/Loginscreen.css';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosInstance } from '../config/config';
import { userLogin } from "../redux/middleware/userauth";

function Loginscreen() {

  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };



  async function login() {
    const isAuth = await dispatch(userLogin(user));
    console.log(isAuth);
    if (isAuth.status && isAuth.data.isVerify) {
      return navigate("/", { state: { user: isAuth.data }, replace: true });
    }
    return setStatus(true);
  }

  function inputHandler(event) {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  }
  
  return (
    <>
        <Container fluid className='color-overlay d-flex justify-content-center align-items-center'> 
            <Row className='shadow-lg jarak  bg-info sm'>
              <h2>Joystay Login</h2>

          
                <Form className="d-grid gap-1 ">
                  
                  <Form.Group className="mb-3" id="email">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <FloatingLabel controlId="floatingEmail" label="Email">
                      <Form.Control name="email" 
                      onChange={inputHandler} 
                      type="email" placeholder="Enter email" />
                    </FloatingLabel>
                  </Form.Group>

                  <InputGroup id="password" >
                    <FloatingLabel controlId="floatingPassword" label="Password">
                      <Form.Control name="password" 
                      onChange={inputHandler} 
                      type={passwordShown ? 'text' : 'password'} placeholder="Password" />
                    </FloatingLabel>
                    <InputGroup.Text id="basic-addon2" onClick={togglePasswordVisiblity}>
                      {passwordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                    </InputGroup.Text>
                  </InputGroup>
                  </Form>

                  
                  
                  
                  <Button className="mt-4" 
                  onClick={login}
                   bg={'#0095F6'} color={'white'} href="/">
                  Login
                  </Button>   
                  


            </Row>
        </Container>
        
      
    </>
    
  );
}

export default Loginscreen;
