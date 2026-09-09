import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Matching from './components/Matching/Matching';

const App = () => (
    <BrowserRouter>
        <Container maxWidth="lg">
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/matches" exact component={Matching} />
            </Switch>
        </Container>
    </BrowserRouter>
);

export default App;
