import React, { useEffect, useState } from 'react'
import { services } from '../services'

// WE ARE RECIEVING STUDENTS FROM THE APP LEVEL NOW, BUT EVERYTHING IS BROKEN BECAUSE STUDENTS IS ACTUALLY AN OBJECT CONTAINING COHORT INFO AND THEN A LIST OF STUDENTS

function HooksPage(props) {
    // const [students, studentChanger] = useState([])
    const { students } = props
    const [aGroup, aChanger] = useState(null)
    const [bGroup, bChanger] = useState(null)
    const audio = new Audio("https://www.wavsource.com/snds_2020-06-10_7014036401687385/sfx/bloop_x.wav")

    // useEffect(runSetup, [])


    function runSetup() {
        services.fetchData()
            .then(json => {
                // studentChanger(json)
            })
    }

    function picker() {
        let studentsWhoHaventGone = students.filter(student => student.have === false)
        const randomNumber = Math.floor((Math.random() * (studentsWhoHaventGone.length)))
        return studentsWhoHaventGone[randomNumber]
    }

    function highlighter() {
        // first, pick a random student ▼
        let victim = picker()
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
        // studentChanger(tempState)
    }

    function twoGroupGenerator() {
        // somewhere in here we need to account for the edge case of only one student being left. once the reset function works, just check for the length of students who haven't gone, and if it's 1 (maybe put that logic in the picker), pick that one student and then do the reset function before continuing
        // first, pick two random students ▼
        let a = picker()
        let b = picker()
        while (a === b) {
            b = picker()
        }
        // then, split the remaining students into two groups (ignoring the two who were selected) ▼
        let one = [a]
        let two = [b]
        let half = Math.floor(students.length / 2)

        for (let i = 0; i < students.length; i++) {
            // alternate shuffling idea: go through student array in order, and randomly decide which group they go to (til both have half)
            // ignoring the two selected students
            if (students[i].id !== a.id && students[i].id !== b.id) {
                if (Math.floor(Math.random() * 2) === 0 && one.length < half) {
                    one.push(students[i])
                }
                else if (two.length < half) {
                    two.push(students[i])
                }
                else {
                    one.push(students[i])
                }
            }
        }
        aChanger(one)
        bChanger(two)
    }

    const populateStudents = (val) => {
        let correctSet = [...students].filter(student => student.have_gone === val)

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

    const swapList = (student) => {
        let replacement;
        student.have = !student.have
        student.chosen = ''
        replacement = students.map(x => {
            if (x.name === student.name) { return student }
            else return x
        })

        return services.postData(student)
            .then(data => {
                // studentChanger(replacement)
            })
    }

    const doubleSwap = (st1, st2) => {
        swapList(st1)
            .then(rt => {
                swapList(st2)
            })
            .then(rt => {
                aChanger(null)
                bChanger(null)
            })
    }

    const reset = () => {
        // potentially patch them slowly in the background
        let alteredStudents = students.map(x => {
            x.have = false
            return x
        })
        for (let i = 0; i < alteredStudents.length; i++) {
            setTimeout(function () {
                services.postData(alteredStudents[i])
                audio.play()
            },
                (i * 100) + 1000);
        }
    }

    // we don't need this function but it was fun to fiddle with so i'm leaving it for posterity
    // async function gato(arr) {
    //     let req = null;
    //     for (let i = 0; i < arr.length; i++) {
    //         req = (services.postData(arr[i]))
    //         await req.then(res => console.log(i, res))
    //     }
    // }

    return (
        <>
            {aGroup ?
                <>
                    <button style={{ width: '30%', alignSelf: 'center', marginTop: '2%' }} onClick={twoGroupGenerator}>Reshuffle</button>
                    <div id='groupHolder'>
                        <div>
                            <h1>Group 1</h1>
                            <p style={{ color: 'blue', fontWeight: 'bold' }}>{aGroup[0].name}</p>
                            <ul style={{ listStyleType: "none", padding: '0%', width: '100%' }}>
                                {aGroup.map(x => x !== aGroup[0] ? <li>{x.name}</li> : null)}
                            </ul>
                        </div>
                        <div>
                            <h1>Group 2</h1>
                            <p style={{ color: 'blue', fontWeight: 'bold' }}>{bGroup[0].name}</p>
                            <ul style={{ listStyleType: "none", padding: '0%', width: '100%' }}>
                                {bGroup.map(x => x !== bGroup[0] ? <li>{x.name}</li> : null)}
                            </ul>
                        </div>
                    </div>
                    <button onClick={() => doubleSwap(aGroup[0], bGroup[0])} style={{ width: '38%', alignSelf: 'center' }}>Save and Go Back</button>
                    <button onClick={() => aChanger(null)} style={{ marginTop: '2px', width: '38%', alignSelf: 'center' }}>Go Back Without Saving</button>
                </>
                :
                <>
                    <h1>Students in Pool</h1>
                    <p>
                        <span>
                            <button
                                className='picker'
                                onClick={highlighter}
                            >
                                PICK A VICTIM
                        </button>
                        </span>
                        <span>
                            <button
                                className='picker'
                                onClick={twoGroupGenerator}
                            >
                                Two Group Generator
                        </button>
                        </span>
                    </p>
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
            }
        </>
    )
}

export default HooksPage



