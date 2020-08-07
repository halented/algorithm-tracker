import React, { useState } from 'react';
import './App.css';
import HooksPage from './components/HooksPage';
import CohortSelectionPage from './components/CohortSelectionPage';

function App() {
  const [cohort, setCohort] = useState([])
  const [showHome, setShowHome] = useState(false)

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <div>Algo Tracker App</div>
      {showHome ?
        <HooksPage students={cohort.students} />
        :
        <CohortSelectionPage setShowHome={setShowHome} setCohort={setCohort}/>
      }
    </div>
  )
}

export default App;

