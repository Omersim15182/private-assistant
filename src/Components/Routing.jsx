// Routing.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Features from '../Pages/Features';
import Pricing from '../Pages/Pricing';
import Menu from './Menu';
import CreateBoard from '../Pages/CreateBoard';
import Board from './Board';
import Chat from './chat/Chat';

function Routing() {
    return (
        <Router>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/Home" exact component={Home} />
                <Route path="/features" component={Features} />
                <Route path="/pricing" component={Pricing} />
                <Route path="/Chat" component={Chat} />
                <Route path="/CreateBoard" component={CreateBoard} />
                <Route path="/Boards" component={Board} />


            </Switch>
        </Router>
    );
}

export default Routing;
