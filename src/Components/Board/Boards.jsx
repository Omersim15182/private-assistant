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

export default function Boards() {
  const [boards, setBoards] = useState([{ id: uuidv4(), expanded: false }]);

  // Add a new board
  const addBoard = () => {
    setBoards([...boards, { id: uuidv4(), expanded: false }]);
  };

  //Delete a board
  const deleteBoard = (id) => {
    const updateBoards = boards.filter((board) => board.id !== id);
    setBoards(updateBoards);
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

            {
              <div className="btn-add">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteBoard(board.id)}
                >
                  Delete board
                </Button>
              </div>
            }
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
