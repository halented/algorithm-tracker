import React from 'react';
import { services } from './services'
import './App.css';

class App extends React.Component {
  state = {
    students: []
  }

  componentDidMount() {
    this.updateState()
  }

  updateState = () => {
    services.fetchData()
      .then(data => {
        data.forEach(student => {
          student.chosen = ''
        })
        this.setState({ students: data })
      })
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

  swapList = (student,reset=false) => {
    if(reset){
      student.have = false
    }
    else {
      student.have = !student.have
      student.chosen = ''
      let tempState = [...this.state.students]
      let repl = tempState.map(x=> {
        if(x.name === student.name){
          return student
        }
        else return x
      })
      this.setState({students: repl})
    }
    services.postData(student)
    .then(data=>{
      console.log("student update posted successfully")
    })
  }

  // let tempState = this.state.students.slice()
  // tempState.forEach(stud=>{
  //   if(stud.id === data.id){
  //     stud = data
  //   }
  // })
  // this.setState({students: tempState}, ()=>{return true})

  // move this into services
  reset = (event, student=Object.assign({}, this.state.students[0])) => {
    console.log("event at the onset: ", event)
    if(event.target){
      event = 1
      console.log("changed event to 1: ", event)
      var prom = new Promise((resolve, reject) => {
        console.log("first recursion")
        if(this.swapList(student, true)) {
          console.log("swapped it")
          resolve()
        }
        else reject()
      })
      prom.then(()=>this.reset( event+1, Object.assign({}, this.state.students[event])) )
    }
    else if(event<=this.state.students.length){
      var prom = new Promise((resolve, reject) => {
        console.log("bulk of recursions")
        if(this.swapList(student, true)) {
          console.log("swapped it")
          resolve()
        }
        else reject()
      }).then(()=>this.reset( event+1, Object.assign({}, this.state.students[event])) )
    }
    else {
      // wait for everything else to finish and update the dom
      // let tempState = this.state.students.slice()
      // tempState.forEach(stud=>{
      //   stud.have = false
      // })
      // this.setState({students: tempState})
      console.log('why does having something in this else tree break the whole function')
    }
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
        if (stud.name === "HAL") {
          stud.chosen = "mega"
        }
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
