import React, { useEffect, useState } from 'react'
import { services } from '../services'

function HooksPage() {
    const [students, studentChanger] = useState([])

    useEffect(runSetup)

    function runSetup(){
        services.fetchData()
        .then(json=>{
            studentChanger(json)
        })
    }

    return (
        <h1>hi from functional comp</h1>
    )
}

export default HooksPage
