import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, Row } from "react-bootstrap";

export function Header() {
  return (
    <Navbar bg="light" expand="lg" className="header">
        <Navbar.Brand as={Link} to="/">Blog-Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}
