import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../Board/board.css";
import Cards from "./Cards";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "./Dnd/Droppable";
import { Draggable } from "./Dnd/Draggable";

export default function Boards() {
  const [boards, setBoards] = useState([{ id: uuidv4(), expanded: false }]);
  const [draggingId, setDraggingId] = useState(null);

  const handleDragStart = (event) => {
    setDraggingId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setDraggingId(null);

    const { active, over } = event;
    if (active.id !== over.id && over) {
      const oldIndex = boards.findIndex((board) => board.id === active.id);
      const newIndex = boards.findIndex((board) => board.id === over.id);

      if (newIndex !== -1) {
        const updatedBoards = [...boards];
        updatedBoards.splice(oldIndex, 1);
        updatedBoards.splice(newIndex, 0, { id: active.id, expanded: false });
        setBoards(updatedBoards);
      }
    }
  };

  const addBoard = () => {
    if (draggingId === null) {
      setBoards([...boards, { id: uuidv4(), expanded: false }]);
    }
  };

  const deleteBoard = (id) => {
    if (draggingId === null && boards.length > 1) {
      const updatedBoards = boards.filter((board) => board.id !== id);
      setBoards(updatedBoards);
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Droppable id="boards">
        <div style={{ display: "flex", flexDirection: "row" }}>
          {boards.map((board) => (
            <Draggable key={board.id} id={board.id}>
              <div className="board">
                <div className="board-title">
                  Board
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                  >
                    <Button
                      sx={{ border: "none" }}
                      onClick={addBoard}
                      disabled={draggingId !== null}
                    >
                      +
                    </Button>
                    <Button
                      sx={{ border: "none" }}
                      onClick={() => deleteBoard(board.id)}
                      startIcon={<DeleteIcon />}
                      disabled={draggingId !== null}
                    ></Button>
                  </ButtonGroup>
                </div>
                <div>
                  <Cards />
                </div>
              </div>
            </Draggable>
          ))}
        </div>
      </Droppable>
    </DndContext>
  );
}
