import React, { useEffect, useState } from 'react'
import { services } from '../services'

function HooksPage() {
    const [students, studentChanger] = useState([])

    useEffect(runSetup, [])

    function runSetup(){
        services.fetchData()
        .then(json=>{
            studentChanger(json)
        })
    }

    function picker() {
        let studentsWhoHaventGone = students.filter(student => student.have === false)
        // first, pick a random student ▼
        const randomNumber = Math.floor((Math.random() * (studentsWhoHaventGone.length)))
        let victim = studentsWhoHaventGone[randomNumber]
        console.log(victim)
        // second, highlight that student's oval ▼
        let tempState = students.slice()
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
        return students.map(student => {
          if (student.have === val) {
            return (
              <li
                className={`studentLink ${student.chosen}`}
                onClick={() => swapList(student)}
                key={student.id}>
                {student.name}
              </li>)
          }
        })
    }

    const swapList = (student,reset=false) => {
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
        services.postData(student)
        .then(data=>{
            console.log("student update posted successfully")
        })
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
            <ul style={{ listStyleType: 'none' }}>
                {populateStudents(true)}
            </ul>
        </>
)
}

export default HooksPage
