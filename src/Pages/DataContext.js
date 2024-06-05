import React, { createContext, useContext, useState } from 'react'

const DataContex = createContext();

export const useData = () => useContext(DataContex);

export const DataProvider = ({ children }) => {
    const [boardTitle, setBoardTitle] = useState('');
    const [user, setUser] = useState([]);

    
    return (
        <DataContex.Provider value={{ boardTitle, setBoardTitle ,user,setUser}}>
            {children}
        </DataContex.Provider>
    )
}
