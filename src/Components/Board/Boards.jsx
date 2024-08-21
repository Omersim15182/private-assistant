import React, { useState, useRef } from "react";
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

  // Delete a board
  const deleteBoard = (id) => {
    if (boards.length > 1) {
      const updatedBoards = boards.filter((board) => board.id !== id);
      setBoards(updatedBoards);
    }
  };

  const dragBoard = useRef(null);
  const draggedOverBoard = useRef(null);

  function handleSort() {
    const boardClone = [...boards];
    const dragIndex = boardClone.findIndex((c) => c.id === dragBoard.current);
    const dragOverIndex = boardClone.findIndex(
      (c) => c.id === draggedOverBoard.current
    );

    if (dragIndex !== -1 && dragOverIndex !== -1) {
      const temp = boardClone[dragIndex];
      boardClone[dragIndex] = boardClone[dragOverIndex];
      boardClone[dragOverIndex] = temp;
      setBoards(boardClone);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {boards.map((board) => (
        <div
          draggable
          onDragStart={() => (dragBoard.current = board.id)}
          onDragEnter={() => (draggedOverBoard.current = board.id)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          className="board"
          key={board.id}
        >
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
