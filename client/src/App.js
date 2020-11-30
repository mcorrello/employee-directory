import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import './App.css';

import Directory from './components/employee/Directory.js'
import Form from './components/employee/Form.js'

function App() {

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Employee Directory</Navbar.Brand>
      </Navbar>
      <br />
      <Router>
        <div>
          <div className="page-info">
            <Switch>
              <Route exact path="/" component={Directory} />
              <Route path="/employee" component={Form} />
              <Route path="/employee/:employeeId" component={Form} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
