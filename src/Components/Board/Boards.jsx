import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../Board/board.css";
import Cards from "./Cards";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Boards() {
  const [boards, setBoards] = useState([{ id: uuidv4(), expanded: false }]);

  const addBoard = () => {
    setBoards([...boards, { id: uuidv4(), expanded: false }]);
  };

  const deleteBoard = (id) => {
    if (boards.length > 1) {
      const updatedBoards = boards.filter((board) => board.id !== id);
      setBoards(updatedBoards);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {boards.map((board) => (
        <div className="board">
          <div className="board-title">
            Board
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button sx={{ border: "none" }} onClick={addBoard}>
                +
              </Button>
              <Button
                sx={{ border: "none" }}
                onClick={() => deleteBoard(board.id)}
                startIcon={<DeleteIcon />}
              ></Button>
            </ButtonGroup>
          </div>
          <div>
            <Cards />
          </div>
        </div>
      ))}
    </div>
  );
}
