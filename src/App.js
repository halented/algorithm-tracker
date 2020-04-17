import React from 'react';
import ClassPage from './components/ClassPage'
import './App.css';

class App extends React.Component {
  

  render() {
    return (
      <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
        <ClassPage />
      </div>
    );
  }
}

export default App;
