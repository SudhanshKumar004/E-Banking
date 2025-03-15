import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { ImHome } from "react-icons/im";
import { FaInfoCircle } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegIdBadge } from "react-icons/fa";







const TopNav = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container className='navContainer'>
        <Navbar.Brand href="#home">E-<span>Banking</span></Navbar.Brand>  <h1>|</h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="home"><ImHome className="navIcons" />
Home</Nav.Link>
            <Nav.Link as={Link} to="about"><FaInfoCircle className="navIcons" />

About</Nav.Link>
            <Nav.Link as={Link} to="login"><RiLoginCircleLine className="navIcons" />
Login</Nav.Link>
            <Nav.Link as={Link} to="registration"><FaRegIdBadge className="navIcons" />
Registration</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default TopNav
