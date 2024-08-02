import React, { useState, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../Board/board.css";
import Cards from "./Cards";
import { v4 as uuidv4 } from "uuid";

//Btn board colors
const PINK = "rgba(255, 192, 203, 0.6)";
const BLUE = "rgba(0, 0, 255, 0.6)";

//Function to change the state of the board
function ContextAwareToggle({ eventKey }) {
  const [textBtn, setTextBtn] = useState("Open");
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    // Toggle button text
    setTextBtn((prev) => (prev === "Open" ? "Close" : "Open"));
  });

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? PINK : BLUE }}
      onClick={decoratedOnClick}
    >
      {textBtn}
    </button>
  );
}

export default function Boards() {
  const [boards, setBoards] = useState([{ id: uuidv4() }]);

  // Add a new board
  const addBoard = () => {
    setBoards([...boards, { id: uuidv4() }]);
  };
  return (
    <div className="board">
     
        {boards.map((board) => ( <Accordion defaultActiveKey={board.id}>
          <Card key={board.id}>
          <Card.Header>
            <ContextAwareToggle eventKey={board.id}>Click me!</ContextAwareToggle>
            <div className="btn-add">
            <Button  variant="dark" onClick={addBoard}>
              Add board
            </Button></div>
          </Card.Header>
          <Accordion.Collapse eventKey={board.id}>
            <Card.Body>
              <Cards boardId={board.id}></Cards>
            </Card.Body>
          </Accordion.Collapse>
        </Card></Accordion>
        ))}
      
    </div>
  );
}
