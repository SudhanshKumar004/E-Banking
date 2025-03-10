import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const Registration = () => {
  return (
    <>
      <h1 className='loginTitle'>Create <span>Account</span></h1>
      <Form className="form-container2">

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Mobile No.</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Full Address</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>City</Form.Label>
    <Form.Control type="text" />
  </Form.Group>
        
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email addres</Form.Label>
    <Form.Control type="email" /> 
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
  <h4 className='registerProm'>Already have an Account? Click here: <Link to={'/login'}>Login</Link></h4>
</Form>
    </>
  )
}

export default Registration
