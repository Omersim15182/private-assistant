import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../png-transparent-hamburger-button-hot-dog-computer-icons-pancake-hot-dog-share-icon-navbar-menu-thumbnail.png';
import { useData } from '../Pages/DataContext';
import '../App.css';
import BoardsMenu from '../Pages/BoardsMenu';
import { v4 as uuidv4 } from 'uuid'; 
import { Reorder } from 'framer-motion';


export default function Board() {

  const { boardTitle } = useData();

  // Initialize boards with an input value
  const [boards, setBoards] = useState([{ id: uuidv4(), title: boardTitle, inputValue: '', isEditing: true }]);


  // Function to handle input change by board ID
  const handleInputChange = (id, event) => {
    const newBoards = boards.map(board => {
      if (board.id === id) {
        return { ...board, inputValue: event.target.value };
      }
      return board;
    });
    setBoards(newBoards);
  };

  // Function to add a new board
  const handleDuplicateBoards = () => {
    const newBoard = { id: uuidv4(), title: boardTitle, inputValue: '', isEditing: true }; 
    setBoards([...boards, newBoard]);
    console.log('id', newBoard.id);
  };

  // Function to handle Enter key press on input
  const handleInputKeyPress = (id, event) => {
    if (event.key === 'Enter') {
      const newBoards = boards.map(board => {
        if (board.id === id) {
          return { ...board, title: board.inputValue,isEditing:false }; 
        }
        return board;
      });
      setBoards(newBoards);
    }
  }
 
    // Function to handle clicking on the title to edit
  const handleEditClick = (id) =>{
    const newBoards = boards.map(board=>{
      if (board.id === id){
        return {...board, isEditing: true}
      }
      return board;
    })
    setBoards(newBoards);
  }

  //close board
  const closeBoard = (id) =>{
    const filterBoards = boards.filter(board => board.id!== id);
    setBoards(filterBoards);
  };

  console.log('this is my boards:',boards);
  
  return (
    <div>
      <BoardsMenu></BoardsMenu>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Reorder.Group values={boards} onReorder={setBoards}>
        {boards.map((board, index) => (
          <Reorder.Item value={board} key={board.id}>
          <Card key={board.id} style={{ width: '18rem', margin: '10px' }}>
            <Card.Header>
              <Card.Img variant="top" src={logo} style={{ height: '30px', width: '30px' }} />
            </Card.Header>
            <Card.Body>
              {board.isEditing ? (
                <div>
                  <Card.Title>{board.inputValue}</Card.Title>
                  <input
                    placeholder='Enter board name'
                    value={board.inputValue}
                    onChange={(e) => handleInputChange(board.id, e)}
                    onKeyPress={(e) => handleInputKeyPress(board.id, e)}
                    autoFocus
                  />
                </div>
                
              ) : (
                <div >
                  <div onClick={()=>handleEditClick(board.id)}>{board.inputValue}</div>
                  {index === boards.length - 1 && <Button variant="primary" onClick={handleDuplicateBoards}>Add list</Button>}
                  <Button onClick={()=>closeBoard(board.id)} variant="light" style={{ position: 'relative', left: '10px' }}>Close</Button>
                </div>
              )}
            </Card.Body>
          </Card>
          </Reorder.Item>
        ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
