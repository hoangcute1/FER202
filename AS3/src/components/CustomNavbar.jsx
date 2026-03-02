import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaLaptopCode, FaPlus } from 'react-icons/fa';

const CustomNavbar = () => {
    const location = useLocation();

    return (
        <Navbar expand="lg" className="bg-white shadow-sm py-3 mb-4 sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold text-primary fs-4">
                    <FaLaptopCode className="me-2" />
                    Mệt Mệt shop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" active={location.pathname === '/'} className="fw-medium mx-2">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/manage" active={location.pathname === '/manage'} className="fw-medium mx-2">
                            Manage Products
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about" active={location.pathname === '/about'} className="fw-medium mx-2">
                            About
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact" active={location.pathname === '/contact'} className="fw-medium mx-2">
                            Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
