import { React } from 'react';
import './App.css';
import MainArea from './utils/MainArea.js'
import SideBar from './utils/SideBar.js'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <Router>
        <div className="App">
            <Route exact path="/">
                <SideBar />
            </Route>
        </div>
    </Router>
  );
}

export default App;
