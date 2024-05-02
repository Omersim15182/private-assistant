// Routing.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Features from '../Pages/Features';
import Pricing from '../Pages/Pricing';
import Menu from './Menu';
import Options from '../Pages/Options';
import CreateBoard from '../Pages/CreateBoard';
import Board from './Board';

function Routing() {
    return (
        <Router>
            <Menu /> 
            <Switch>
                <Route path="/Home" exact component={Home} />
                <Route  path="/features" component={Features} />
                <Route path="/pricing" component={Pricing} />
                <Route path="/Options" component={Options} />
                <Route path="/CreateBoard" component={CreateBoard} />
                <Route path="/Board" component={Board} />
                
            </Switch>
        </Router>
    );
}

export default Routing;
