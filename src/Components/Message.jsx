import React from 'react'
import { Card } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function Message() {
  return (
    <div>
       <Card style={{ height:'29rem',width: '35rem',background: '#f0f0f0' }}>
        <Card.Body>
          <Card.Title>Messages</Card.Title>
        </Card.Body>
      <>
      
     
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
    </>
      </Card>
    </div>
  )
}
