import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from './DataContext';

function CreateBoard({ show, onHide }) {
    const [workSpaceVisibility, setWorkSpaceVisibility] = useState('Workspace visible')

    const handleSelectVisibility = (eventKey) => {
        setWorkSpaceVisibility(eventKey);
    };

    const closeCreateBoard = () => {
        setBoardTitle(inputValue);
        onHide();

    };

    const [inputValue, setInputValue] = useState('');

    const inputCatch = (event) => {
        setInputValue(event.target.value);
    };
    const { setBoardTitle } = useData();


    console.log(inputValue);


    return (

        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create board</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Add board title</Form.Label>
                        <Form.Control
                            type="title"
                            placeholder="Task"
                            autoFocus
                            onChange={inputCatch}

                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <NavDropdown title={workSpaceVisibility}
                            id="basic-nav-dropdown"
                            onSelect={handleSelectVisibility}>
                            <NavDropdown.Item eventKey="Private" href="#/Private">Private</NavDropdown.Item>
                            <NavDropdown.Item eventKey="Workspace" href="#/Workspace">Workspace</NavDropdown.Item>
                            <NavDropdown.Item eventKey="Public" href="#/Public">Public</NavDropdown.Item>

                        </NavDropdown>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" as={Link} to='/Board' onClick={closeCreateBoard}>
                    Create board
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default CreateBoard;