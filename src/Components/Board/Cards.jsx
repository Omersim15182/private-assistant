import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function Cards() {
  const [card, setCard] = useState([{ message: "", id: uuidv4() }]);
  const widthRefs = useRef({}); // To store references to the widthMachine spans

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Change the text in card and adjust the input width
  const handleText = (e, id) => {
    const updatedCards = card.map((card) =>
      card.id === id ? { ...card, message: e.target.value } : card
    );
    setCard(updatedCards);

    // Update the width of the input based on the span width
    const span = widthRefs.current[id];
    if (span) {
      span.textContent = e.target.value;
      e.target.style.width = `${span.offsetWidth + 5}px`; // +5 for padding/border
    }
  };

  // Add card
  const addCard = () => {
    setCard([...card, { message: "", id: uuidv4() }]);
  };

  // Delete card
  const deleteCard = (id) => {
    const updatedCards = card.filter((card) => card.id !== id);
    setCard(updatedCards);
  };

  return (
    <div>
      {card.map(({ message, id }) => (
        <div className="card" key={id}>
          <div className="main_card">
            <Checkbox {...label} />
            <span
              className="width-machine"
              ref={(el) => (widthRefs.current[id] = el)}
            >
              {message}
            </span>
            <input
              className="input-card"
              placeholder="Enter card"
              value={message}
              onChange={(e) => handleText(e, id)}
              style={{ width: "auto" }}
            />
            <div className="card-delete">
              <div>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                  <Button onClick={() => addCard()}>+</Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteCard(id)}
                  ></Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
