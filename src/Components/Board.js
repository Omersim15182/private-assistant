import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../png-transparent-hamburger-button-hot-dog-computer-icons-pancake-hot-dog-share-icon-navbar-menu-thumbnail.png';
import { useData } from '../Pages/DataContext';
import '../App.css';
import BoardsMenu from '../Pages/BoardsMenu';
import { v4 as uuidv4 } from 'uuid';
import Cards from './Cards';
import min from '../minimize.png';
import max from '../maximize.png';


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
    console.log('id board', newBoard.id);
  };

  // Function to handle Enter key press on input
  const handleInputKeyPress = (id, event) => {
    if (event.key === 'Enter') {
      const newBoards = boards.map(board => {
        if (board.id === id) {
          return { ...board, title: board.inputValue, isEditing: false };
        }
        return board;
      });
      setBoards(newBoards);
    }
   if (event.key === 'Escape') {
    const newBoards = boards.map(board =>{
      if (board.id === id) {
        return { ...board, title: board.inputValue, isEditing: true };
      }
      return board;
    })
    setBoards(newBoards);
   }
  }

  // Function to handle clicking on the title to edit
  const handleEditClick = (id) => {
    const newBoards = boards.map(board => {
      if (board.id === id) {
        return { ...board, isEditing: true }
      }
      return board;
    })
    setBoards(newBoards);
  }

  //Reduce board
  const closeBoard = (id) => {
    const filterBoards = boards.filter(board => board.id !== id);
    setBoards(filterBoards);
  };

  console.log('this is my boards:', boards);

  return (
    <div>
      <BoardsMenu></BoardsMenu>
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>

        {boards.map((board, index) => (
          <div key={board.id}>
            <Card key={board.id} style={{ width: '18rem', margin: '10px' }}>
              <Card.Header>
                <Card.Img key={board.id} variant="top" src={logo} style={{ height: '30px', width: '30px' }} />
                <Button onClick={()=>handleInputKeyPress(board.id,{key :board.isEditing ? 'Enter' : 'Escape'})} variant="top" type="submit" style={{ height: '30px', width: '30px', padding: 0, border: 0, position: 'relative', left: '200px' }}>
                  { board.isEditing ? (
                    <img key={board.id} src={max} alt="Maximize" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img  src={min} alt="Minimize" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                  )}
                </Button>
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
                     <Cards ></Cards>
                  </div>
                ) : (
                  <div >
                    <div onClick={() => handleEditClick(board.id)}>{board.inputValue}</div>
                    <Button onClick={() => closeBoard(board.id)} variant="light" style={{ position: 'relative', left: '10px' }}>Close</Button>
                  </div>
                )}
              </Card.Body>
            </Card>
            {index === boards.length - 1 && <Button style={{
              position: 'relative',
              left: '20rem',
              bottom: '3rem'
            }} variant="primary" onClick={handleDuplicateBoards}>Add list</Button>}
          </div>
        ))}

      </div>
    </div>
  );
}
