import React, { createContext, useContext, useState } from 'react'

const DataContex = createContext();

export const useData = () => useContext(DataContex);

export const DataProvider = ({children }) =>{
    const [boardTitle,setBoardTitle] = useState('');

    return(
        <DataContex.Provider value={{boardTitle,setBoardTitle}}>
            {children }
        </DataContex.Provider>
    )
}
