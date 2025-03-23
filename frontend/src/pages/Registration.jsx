import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../config/Api_base';
import axios from "axios"
import { toast } from 'react-toastify';


const Registration = () => {
  
  const[input, setInput] = useState({})
  const nav = useNavigate();




  const handleInput =(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setInput(values=>({...values, [name]:value}))
        console.log(input);
        
    }

    const handleSubmit = async(e)=>{
      e.preventDefault;
      let api = `${BASE_URL}/customer/registration`
      
      try {
        let response = await axios.post(api, input);
        console.log(response.data);
        toast.success("You are registered", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            });
        nav("/login")

      } catch (error) {
        console.log(error);
        
      }
    }

  return (
    <>
      <h1 className='loginTitle'>Create <span>Account</span></h1>
      <Form className="form-container2">

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" name='fname' onChange={handleInput}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" name='lname' onChange={handleInput} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Mobile No.</Form.Label>
    <Form.Control type="text" name='mobile' onChange={handleInput} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Full Address</Form.Label>
    <Form.Control type="text" name='address' onChange={handleInput} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>City</Form.Label>
    <Form.Control type="text" name='city' onChange={handleInput} />
  </Form.Group>
        
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email addres</Form.Label>
    <Form.Control type="email" name='email' onChange={handleInput} /> 
  </Form.Group>

  <Button variant="primary" onClick={handleSubmit}>
    Submit
  </Button>
  <h4 className='registerProm'>Already have an Account? Click here: <Link to={'/login'}>Login</Link></h4>
</Form>
    </>
  )
}

export default Registration
