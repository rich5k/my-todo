
import Tasks from "./components/Tasks";
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TaskItems from "./components/TaskItems";
function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
          <Route path="/task/:id" element={<TaskItems />}/> 
            <Route path="/" element={<Tasks />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
