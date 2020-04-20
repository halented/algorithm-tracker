import React from 'react';
import ClassPage from './components/ClassPage'
import './App.css';
import HooksPage from './components/HooksPage';

class App extends React.Component {
  

  render() {
    return (
      <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
        <ClassPage />
        {/* <HooksPage /> */}
      </div>
    );
  }
}

export default App;
