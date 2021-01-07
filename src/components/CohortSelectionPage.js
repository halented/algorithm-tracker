import React, { useState, useEffect } from 'react';
import { services } from '../services';
import { Button, message } from 'antd'

function CohortSelectionPage(props) {
    const [showForm, setShowForm] = useState(true)
    const { setCohort, setShowHome } = props
    const [cohorts, setCohorts] = useState([])
    const [selection, setSelection] = useState("")

    
    useEffect(() => {
        services.fetchCohorts()
            .then(data => setCohorts(data))
    }, []);

    const handleSubmitSelection = (ev) => {
        ev.preventDefault()
        // first, grab student data
        services.getStudentData(selection)
            .then(data => {
                // save students to state && go back to the homepage
                setCohort(data.cohort)
                setShowHome(true)
            })
    }

    const handleSubmitNewCohort = (ev) => {

        message.info("clickerson")
    }
    const tester = () => {
        setShowForm(true)
        message.success("You clicked a button 🎉")
    }

    return (
        <div>
            {
                showForm ?
                    <div style={{
                        margin:'10%', 
                        padding:'2%',
                        boxShadow: '2px 2px 0px 0px #4e5668', 
                        border: '3px solid black'
                        }}
                    >
                        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(ev)=>handleSubmitNewCohort(ev)}>
                            <label>Cohort Name (optional)</label>
                            <input placeholder='Dixon Ticonderogas'></input>
                            <label><span style={{ color: 'red' }}>*</span>Start Date (MMDDYY)</label>
                            <input placeholder='012819'></input>
                            <label><span style={{ color: 'red' }}>*</span>List of Students (separated by commas)</label>
                            <input placeholder="Beyonce, Liv Tyler, Lupita Nyong'o"></input>
                            <Button type='primary' style={{width: '50%', alignSelf: 'center'}} onClick={(ev)=>handleSubmitNewCohort(ev)}>Save</Button>
                        </form>
                        <Button onClick={() => setShowForm(false)}>Wait! Go back</Button>
                        <p style={{ fontSize: 'x-small', fontStyle: 'italic' }}><span style={{ color: 'red' }}>* </span>= required.</p>
                    </div>
                    :
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p>Select a Cohort</p>
                        <form>
                            <select onChange={(ev)=>setSelection(ev.target.value)} value={selection}>
                                <option default>Select Below</option>
                                {cohorts && cohorts.map(x => <option key={x.id} value={x.id}>{x.name}</option>)} 
                            </select>
                            <Button type='submit' onClick={(ev)=>handleSubmitSelection(ev)}>Submit</Button>
                        </form>
                        <span>Or..
                        <Button onClick={() => tester()}>
                                Add a New Cohort
                        </Button>
                        </span>
                    </div>
            }
        </div>
    )
}

export default CohortSelectionPage;
