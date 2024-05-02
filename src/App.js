import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from './Components/Routing';
import { DataProvider } from './Pages/DataContext';



function App() {
    return (
        <div>
            <DataProvider>
                <Routing></Routing>
            </DataProvider>
        </div>
    );
}

export default App;
