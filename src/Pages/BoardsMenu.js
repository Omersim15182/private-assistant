import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useData } from './DataContext';

export default function BoardsMenu() {

    const {boardTitle} = useData()

  return (
    <div>
       <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand ><b>Name Project : {boardTitle}</b> </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/Home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/features">Features</Nav.Link>
                    <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
                    <NavDropdown title="Options" id="basic-nav-dropdown"> 
                        <NavDropdown.Item  as={Link} to="/CreateBoard">Create board</NavDropdown.Item>
                        <NavDropdown.Item href="#/action-2">Start with a template</NavDropdown.Item>
                        <NavDropdown.Item href="#/action-3">Create Workspace</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
            </Container>
        </Navbar>
    
    </div>
  )
}
