import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const { v4: uuidv4 } = require("uuid");

export default function Cards() {
  const [card, setCard] = useState([{ message: "", id: uuidv4() }]);

  //Change the text in card
  const handleText = (e, id) => {
    const updatedCards = card.map((card) =>
      card.id === id ? { ...card, message: e.target.value } : card
    );
    setCard(updatedCards);
  };

  //Add card
  const addCard = () => {
    setCard([...card, { message: "", id: uuidv4() }]);
  };

  //delete card
  const deleteCard = (id) => {
    const updatedCards = card.filter((card) => card.id !== id);
    setCard(updatedCards);
  };

  return (
    <div >
      {card.map(({ message, id }) => (
        <div key={id} >
          <input 
            placeholder="Enter card"
            value={message}
            onChange={(e) => handleText(e, id)}
          />{" "}
          <Button variant="dark" onClick={() => deleteCard(id)}>delete card</Button>
        </div>
      ))}

      <Button variant="dark" onClick={addCard}>
        Add card
      </Button>
    </div>
  );
}
