import React, { useEffect, useState } from 'react'
import { services } from '../services'

function HooksPage() {
    const [students, studentChanger] = useState([])

    useEffect(runSetup, [])

    function runSetup(){
        console.log("hey")
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

    return (
        <>
            <h1>Students in Pool</h1>
            <button
            id='picker'
            onClick={picker}
            >
            PICK A VICTIM
            </button>
        </>
)
}

export default HooksPage
