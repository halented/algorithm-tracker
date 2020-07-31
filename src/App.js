import React, { useState } from 'react';
import './App.css';
import HooksPage from './components/HooksPage';
import CohortSelectionPage from './components/CohortSelectionPage';

function App() {
  const [students, setStudents] = useState([])
  const [showHome, setShowHome] = useState(false)

  const makeSelection = (selection) => {

  }

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      Algo Tracker App
        <CohortSelectionPage makeSelection={makeSelection}/>
        {showHome && <HooksPage students={students}/>}
      </div>
  )
}

export default App;

