/// MainApp.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage'; // Import your HomePage component
import Error404Page from './Error404Page'; // Import the new Error404Page component

const MainApp = () => {
    return (
        <Router>
            <Switch>
                {/* Define your other routes here */}
                <Route exact path="/" component={HomePage} />
                {/* Fallback route for 404 errors */}
                <Route component={Error404Page} />
            </Switch>
        </Router>
    );
};

export default MainApp;
