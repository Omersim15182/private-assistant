import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../Board/board.css";
import Cards from "./Cards";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";

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

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {boards.map((board) => (
        <div className="board" key={board.id}>
          <div key={board.id}>
            <div className="board-title">
              Board
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button onClick={addBoard}>+</Button>
                <Button
                  onClick={() => deleteBoard(board.id)}
                  startIcon={<DeleteIcon />}
                ></Button>
              </ButtonGroup>
            </div>
            <div>
              <Cards></Cards>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
