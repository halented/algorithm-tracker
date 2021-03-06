import React, {Component} from 'react'
import { services } from '../services'


class ClassPage extends Component {
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
      // there is no async await in here
      reset = (event, student=Object.assign({}, this.state.students[0])) => {
        console.log("event at the onset: ", event)
        var prom;
        if(event.target){
          event = 1
          console.log("changed event to 1: ", event)
          prom = new Promise((resolve, reject) => {
            if(this.swapList(student, true)) {
              resolve()
            }
            else reject()
          })
          prom.then(()=>this.reset( event+1, Object.assign({}, this.state.students[event])) )
        }
        else if(event<=this.state.students.length){
          prom = new Promise((resolve, reject) => {
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
            stud.name === "HAL" ? 
            stud.chosen = "mega" 
            : 
            stud.chosen = 'highlight'
          }
        })
        this.setState({ students: tempState })
      }

      render() {
          return (
            <>
                <h1>Students in Pool</h1>
                <button
                id='picker'
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
                id='reset'
                onClick={this.reset}
                >
                  Reset
                </button>
            </>
        )
      }
}

export default ClassPage