import React, { useState } from 'react';
import './App.css';
import HooksPage from './components/HooksPage';
import CohortSelectionPage from './components/CohortSelectionPage';

function App() {
  const [students, setStudents] = useState([])
  const [showHome, setShowHome] = useState(false)

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      Algo Tracker App
      {showHome ?
        <HooksPage students={students} />
        :
        <CohortSelectionPage setShowHome={setShowHome} setStudents={setStudents}/>
      }
    </div>
  )
}

export default App;

