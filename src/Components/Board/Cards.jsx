import React, { useState } from "react";
import { Button, Box, TextField, Paper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function Cards() {
  const [card, setCard] = useState([{ message: "", id: uuidv4() }]);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
      }}
    >
      {card.map(({ message, id }) => (
        <Paper
          key={id}
          sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}
        >
          <TextField
            placeholder="Enter card"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => handleText(e, id)}
          />
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteCard(id)}
          >
            Delete Card
          </Button>
        </Paper>
      ))}

      <Button variant="contained" color="primary" onClick={addCard}>
        Add Card
      </Button>
    </Box>
  );
}
