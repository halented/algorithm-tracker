import React, { useEffect, useState } from 'react'
import { services } from '../services'

function HooksPage() {
    const [students, studentChanger] = useState([])

    useEffect(runSetup, [])

    function runSetup(){
        services.fetchData()
        .then(json=>{
            studentChanger(json.studentials)
        })
    }

    function picker() {
        let studentsWhoHaventGone = students.filter(student => student.have === false)
        // first, pick a random student ▼
        const randomNumber = Math.floor((Math.random() * (studentsWhoHaventGone.length)))
        let victim = studentsWhoHaventGone[randomNumber]
        console.log(victim)
        // second, highlight that student's oval ▼
        let tempState = [...students]
        tempState.forEach(student => {
          if (student === victim) {
            student.name === "HAL" ? 
            student.chosen = "mega" 
            : 
            student.chosen = 'highlight'
          }
        })
        studentChanger(tempState)
    }

    const populateStudents = (val) => {
        let correctSet = [...students].filter(student=> student.have === val)

        return correctSet.map(student => {
            return (
              <li
                className={`studentLink ${student.chosen}`}
                onClick={() => swapList(student)}
                key={student.id}>
                {student.name}
              </li>)
        })
    }

    const swapList = (student,reset=false) => {
        console.log("does it get here")
        if(reset){
            student.have = false
        }
        else {
            student.have = !student.have
            student.chosen = ''
            let replacement = students.map(x=> {
                if(x.name === student.name){return student}
                else return x
            })
            studentChanger(replacement)
        }
        return services.postData(student)
        .then(data=>{
            console.log("student update posted successfully")
        })
    }

    const reset = () => {
      // despair
    }

    return (
        <>
            <h1>Students in Pool</h1>
            <button
            id='picker'
            onClick={picker}
            >
            PICK A VICTIM
            </button>
            <ol>
                {populateStudents(false)}
            </ol>
            <h1>Students who are safe....for now</h1>
            <ul id='completed'>
                {populateStudents(true)}
            </ul>
            <button onClick={reset} id='reset'>
                reset
            </button>
        </>
    )
}

export default HooksPage



// below is some non-working code using promises to try to get the json-server database to let me make a bunch of requests in a row to reset all students. currently, it will work most of the time, but occasionally run too fast and break everything. will refactor eventua
// console.log("event at the onset: ", event)
//         var prom;
//         if(event.target){
//           event = 1
//           console.log("changed event to 1: ", event)
//           prom = new Promise((resolve, reject) => {
//             if(swapList(student, true)) {
//               resolve()
//             }
//             else reject()
//           }).then(()=>reset( event+1, Object.assign({}, students[event])))
//         }
//         else if(event<=students.length){
//           prom = new Promise((resolve, reject) => {
//             console.log("bulk of recursions")
//             if(swapList(student, true)) {
//               console.log("swapped it")
//               resolve()
//             }
//             else reject()
//           }).then(()=>reset( event+1, Object.assign({}, students[event])) )
//         }
//         else {
//           // wait for everything else to finish and update the dom
//           console.log('recursions should be all done at this point. time to update the state')
//         }