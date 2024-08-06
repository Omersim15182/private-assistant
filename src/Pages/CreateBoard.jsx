import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "./DataContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function CreateBoard({ show, onHide }) {
  const [workSpaceVisibility, setWorkSpaceVisibility] = useState("Workspace"); // Initial value updated
  const [inputValue, setInputValue] = useState("");
  const { setBoardTitle } = useData();

  const handleSelectVisibility = (event) => {
    setWorkSpaceVisibility(event.target.value);
  };

  const closeCreateBoard = () => {
    setBoardTitle(inputValue);
    onHide();
  };

  const inputCatch = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Dialog open={show} onClose={onHide}>
      <DialogTitle>Create board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Add board title"
          type="text"
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={inputCatch}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Visibility</InputLabel>
          <Select
            value={workSpaceVisibility}
            onChange={handleSelectVisibility}
            label="Visibility"
          >
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="Workspace">Workspace</MenuItem>
            <MenuItem value="Public">Public</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHide} color="secondary">
          Close
        </Button>
        <Button
          component={Link}
          to="./Boards"
          onClick={closeCreateBoard}
          color="primary"
        >
          Create board
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateBoard;
