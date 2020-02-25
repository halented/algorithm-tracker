import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    students: []
  }

  componentDidMount() {
    fetch("https://api.jsonbin.io/b/5e54534d699c8612f6d41b76/1",
      {
        headers: {
          'secret-key': '$2b$10$H9MZieFWGmH.jLCvLpr7HO9uJA..HwJmAQKILpZaCYRzVG2UFNZT6'
        }
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({ students: json })
      })
  }


  populateStudents = (val) => {
    return Object.values(this.state.students).map(student => {
      if (student.have === val) {
        return <li className='studentLink' onClick={() => this.swapList(student)} key={student.id}>{student.name}</li>
      }
    })
  }

  swapList = (student) => {
    let tempState = Object.assign(this.state.students)
    for (let stud of tempState) {
      if (stud.id === student.id) {
        stud.have = !stud.have
      }
    }
    console.log(tempState)
    fetch(`https://api.jsonbin.io/b/5e54534d699c8612f6d41b76`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'secret-key': '$2b$10$H9MZieFWGmH.jLCvLpr7HO9uJA..HwJmAQKILpZaCYRzVG2UFNZT6',
        'versioning': false
      },
      body: JSON.stringify(tempState)
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ students: json.data })
      })
  }

  render() {
    return (
      <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
        <h1>Students in Pool</h1>
        <button style={{width: '33%', margin: 'auto', borderRadius: '4em', color: 'red'}}>PICK A VICTIM</button>
        <ol>
          {this.populateStudents(false)}
        </ol>
        <h1>Students who are safe....for now</h1>
        <ul style={{ listStyleType: 'none' }}>
          {this.populateStudents(true)}
        </ul>
      </div>
    );
  }
}

export default App;
