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
        json.forEach(stu=>{
          stu.chosen = ''
        })
        console.log(json)
        this.setState({ students: json })
      })
  }


  populateStudents = (val) => {
    return Object.values(this.state.students).map(student => {
      if (student.have === val) {
        return <li className={`studentLink ${student.chosen}`} onClick={() => this.swapList(student)} key={student.id}>{student.name}</li>
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
        json.data.forEach(stu=>{
          stu.chosen = ''
        })
        this.setState({ students: json.data })
      })
  }

  picker = () => {
    let studentsWhoHaventGone = this.state.students.filter(student=> student.have === false)
    // first, pick a random student
    const randomNumber = Math.floor((Math.random()*(studentsWhoHaventGone.length)))
    let student = studentsWhoHaventGone[randomNumber]
    // second, highlight that student's oval
    let tempState = this.state.students.slice()
    tempState.forEach(stud=>{
      if(stud === student){
        stud.chosen = 'highlight'
      }
    })
    this.setState({students: tempState})
  }

  reset = () => {
    let tempState = this.state.students.slice()
    for (let stud of tempState) {
      stud.have = false
    }
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
        json.data.forEach(stu=>{
          stu.chosen = ''
        })
        this.setState({ students: json.data })
      })
  }

  render() {
    return (
      <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
        <h1>Students in Pool</h1>
        <button 
          style={{
            width: '33%', 
            margin: 'auto', 
            borderRadius: '4em', 
            color: 'red'}}
            onClick={this.picker}
            >
            PICK A VICTIM
        </button>
        <ol>
          {this.populateStudents(false)}
        </ol>
        <h1>Students who are safe....for now</h1>
        <ul style={{ listStyleType: 'none' }}>
          {this.populateStudents(true)}
        </ul>
        <button 
          style={{
            width: '33%', 
            margin: 'auto', 
            borderRadius: '4em', 
            color: 'cornflowerblue'}}
            onClick={this.reset}
            >
              Reset
        </button>
      </div>
    );
  }
}

export default App;
