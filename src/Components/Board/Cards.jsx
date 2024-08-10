import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function Cards() {
  const [card, setCard] = useState([{ message: "", id: uuidv4() }]);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Change the text in card
  const handleText = (e, id) => {
    const updatedCards = card.map((card) =>
      card.id === id ? { ...card, message: e.target.value } : card
    );
    setCard(updatedCards);
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
            <input
              className="input-card"
              placeholder="Enter card"
              value={message}
              onChange={(e) => handleText(e, id)}
            ></input>
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
