
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../photos/png-transparent-hamburger-button-hot-dog-computer-icons-pancake-hot-dog-share-icon-navbar-menu-thumbnail.png';
import CreateBoard from '../Pages/CreateBoard';


function Menu() {

    const [showCreateBoard,setCreateBoard] = useState(false);
    const toggleCreateBoard = () =>{
        setCreateBoard(!showCreateBoard)
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand > <img src={logo}
                    width="30"
                    height="30"
                    alt="Your Logo"></img> Pr.Assistant</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/Home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/features">Features</Nav.Link>
                    <Nav.Link as={Link} to="/Chat">chat</Nav.Link>
                    <NavDropdown title="Options" id="basic-nav-dropdown"> 
                        <NavDropdown.Item onClick={toggleCreateBoard} as={Link} to="/CreateBoard">Create board</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/Boards">Start with a template</NavDropdown.Item>
                        <NavDropdown.Item href="#/action-3">Create Workspace</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
            {showCreateBoard && <CreateBoard show={showCreateBoard} onHide={() => setCreateBoard(false) } />}
        </Navbar>
    );
}

export default Menu;
