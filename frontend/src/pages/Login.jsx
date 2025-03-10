import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <>

    <h1 className='loginTitle'>Account <span>Login</span></h1>
      <Form className="form-container">
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" />
   
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
  <h4 className='registerProm'>Don't have an Account? Click here: <Link to={'/registration'}>Registration</Link></h4>
</Form>

    </>
  )
}

export default Login
