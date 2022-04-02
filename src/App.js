
import Tasks from "./components/Tasks";
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NewTask from "./components/NewTask";
function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
          {/* <Route path="/task/:id">
                <Tasks />
            </Route>  */}
            <Route path="/" element={<Tasks />} />
            <Route path="/new" element={<NewTask />} />    
          </Routes>
      </Router>
    </div>
  );
}

export default App;
