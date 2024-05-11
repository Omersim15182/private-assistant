import React, { useState } from 'react'
import Board from './Board'
import { v4 as uuidv4 } from 'uuid';
import BoardsMenu from '../Pages/BoardsMenu';

export default function Boards() {
    const [boards, setBoards] = useState([{ id: uuidv4(), show: true }]);

    const handleDuplicateBoards = () => {
        const newBoards = { id: uuidv4(), show: true };
        setBoards([...boards, newBoards]);
    }

    const toggleBoardVisibility = (id) => {
        const newBoards = boards.map(board => {
            if (board.id === id) {
                return { ...board, show: !board.show };
            }
            return board;
        });
        setBoards(newBoards);
    }

    return (
        <div>
            <BoardsMenu />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                {boards.map((board, index) => (
                    <div key={board.id}>
                        {board.show && <Board id={board.id} />}
                    </div>
                ))}
            </div>
        </div>
    )
}
