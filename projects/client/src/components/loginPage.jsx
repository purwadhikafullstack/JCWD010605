import React, { useState, useEffect } from 'react';
import { Form, Button, Container, FloatingLabel, InputGroup, Row, Nav } from 'react-bootstrap';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosInstance } from '../config/config';
import user_types from "../redux/auth/types";
import { userLogin } from "../redux/middleware/userauth";
import { NavLink } from 'react-router-dom';


function LoginPage() {

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
    try {
      const res =  await axiosInstance.post("/auth/login", user)
      const userData = res.data.result
  
      console.log(userData);
      if(userData) 
     { dispatch({
          type: user_types.USER_LOGIN,
          payload: userData.result
      })
          
      localStorage.setItem("token", userData.token)
      navigate("/")  
      }
      
    } catch (error) {
      console.log(error);     
    }
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
            <Row className='shadow-lg jarak sm' style={{width: '500px'}}>
              <h2>Joystay Login</h2>
     
                <Form className="d-grid gap-1 ">        

                  <Form.Group className="mb-3" id="email">
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

                  <Button className="mt-2" 
                  onClick={login}
                  style={{ background: '#f4ebd0', color: 'black', borderStyle:'none' }} >
                  Login
                  </Button>
                  </Form>       

                  <Nav className='justify-content-center mt-3 gap-0' >
                    <Nav.Item>
                      <Nav.Link  eventKey="disabled" disabled>Dont have an account?</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href='/register'>Register</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  
            </Row>
        </Container> 
    </>
  );
}

export default LoginPage;
