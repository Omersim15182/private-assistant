import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import "../Board/board.css";
import Cards from "./Cards";

// Btn board colors
const PINK = "rgba(255, 192, 203, 0.6)";
const BLUE = "rgba(0, 0, 255, 0.6)";

// Function to change the state of the board
function ContextAwareToggle({ eventKey, expanded, onClick }) {
  const [textBtn, setTextBtn] = useState("Open");

  const handleClick = () => {
    setTextBtn((prev) => (prev === "Open" ? "Close" : "Open"));
    onClick();
  };

  return (
    <Button
      variant="contained"
      style={{ backgroundColor: expanded ? PINK : BLUE }}
      onClick={handleClick}
    >
      {textBtn}
    </Button>
  );
}

export default function Boards() {
  const [boards, setBoards] = useState([{ id: uuidv4(), expanded: false }]);

  // Add a new board
  const addBoard = () => {
    setBoards([...boards, { id: uuidv4(), expanded: false }]);
  };

  const handleChange = (id) => (event, isExpanded) => {
    setBoards(
      boards.map((board) =>
        board.id === id ? { ...board, expanded: isExpanded } : board
      )
    );
  };

  return (
    <div className="board">
      {boards.map((board) => (
        <Accordion
          key={board.id}
          expanded={board.expanded}
          onChange={handleChange(board.id)}
        >
          <Card>
            <CardHeader
              action={
                <ContextAwareToggle
                  eventKey={board.id}
                  expanded={board.expanded}
                  onClick={() => {}}
                />
              }
              title={
                <div className="btn-add">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addBoard}
                  >
                    Add board
                  </Button>
                </div>
              }
            />
            <AccordionDetails>
              <CardContent>
                <Cards boardId={board.id} />
              </CardContent>
            </AccordionDetails>
          </Card>
        </Accordion>
      ))}
    </div>
  );
}
