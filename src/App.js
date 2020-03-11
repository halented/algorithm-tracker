import React from 'react';
import { services } from './services'
import './App.css';

class App extends React.Component {
  state = {
    students: []
  }

  componentDidMount() {
    services.fetchData()
      .then(data => {
        data.forEach(student => {
          student.chosen = ''
        })
        this.setState({ students: data })
      })
  }

  updateState = (data) => {
    data.forEach(student => {
      student.chosen = ''
    })
    this.setState({ students: data })
  }

  populateStudents = (val) => {
    return this.state.students.map(student => {
      if (student.have === val) {
        return (
          <li
            className={`studentLink ${student.chosen}`}
            onClick={() => this.swapList(student)}
            key={student.id}>
            {student.name}
          </li>)
      }
    })
  }

  swapList = ({ id, have }) => {
    let tempState = this.state.students.slice()
    for (let student of tempState) {
      if (student.id === id) {
        student.have = !have
      }
    }
    services.postData(tempState)
    .then(json=>this.updateState(json))
  }

  reset = () => {
    let tempState = [...this.state.students]
    console.log("made a copy: ", tempState)
    debugger;
    for (let student of tempState) {
      student.have = false
    }
    // console.log("after iterating: ", tempState)
    // services.postData(tempState)
    // .then(json=>{
    //   console.log(json)
    //   this.updateState(json)
    // })
  }

  picker = () => {
    let studentsWhoHaventGone = this.state.students.filter(student => student.have === false)
    // first, pick a random student ▼
    const randomNumber = Math.floor((Math.random() * (studentsWhoHaventGone.length)))
    let student = studentsWhoHaventGone[randomNumber]
    // second, highlight that student's oval ▼
    let tempState = this.state.students.slice()
    tempState.forEach(stud => {
      if (stud === student) {
        stud.chosen = 'highlight'
      }
    })
    this.setState({ students: tempState })
  }

  render() {
    return (
      <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Students in Pool</h1>
        <button
          style={{
            width: '33%',
            margin: 'auto',
            borderRadius: '4em',
            color: 'red'
          }}
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
            color: 'cornflowerblue'
          }}
          onClick={this.reset}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default App;
