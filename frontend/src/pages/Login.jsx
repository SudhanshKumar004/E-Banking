import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom'
import BASE_URL from '../config/Api_base';
import axios from 'axios';


const Login = () => {

   const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const nav = useNavigate();



    const handleSubmit=async()=>{
        let api = `${BASE_URL}/customer/login`

        try {
        
            const response = await axios.post(api, {email:email, password:password})
            console.log(response);
            
            localStorage.setItem("token" , response.data.token);
            localStorage.setItem("name", response.data.customer.firstname)
            alert("Login SuccessFully")
            nav("/dashboard")
            
        } 
        catch (error) {
            console.log(error);
            alert(error.response.data)
        }
    }

  return (
    <>

    <h1 className='loginTitle'>Account <span>Login</span></h1>
      <Form className="form-container">
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" onChange={(e)=>{setEmail(e.target.value)}} />
   
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" onChange={(e)=>{setPassword(e.target.value)}} />
  </Form.Group>

  <Button variant="primary" onClick={handleSubmit}>
    Submit
  </Button>
  <h4 className='registerProm'>Don't have an Account? Click here: <Link to={'/registration'}>Registration</Link></h4>
</Form>

    </>
  )
}

export default Login
