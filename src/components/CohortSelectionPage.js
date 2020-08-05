import React, { useState, useEffect } from 'react';
import { services } from '../services';

function CohortSelectionPage(props) {
    const [showForm, setShowForm] = useState(false)
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
                setCohort(data)
                setShowHome(true)
            })
    }

    const handleSubmitNewCohort = () => {

    }

    return (
        <div>
            {
                showForm ?
                    <>
                        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmitNewCohort}>
                            <label>Cohort Name (optional)</label>
                            <input placeholder='Dixon Ticonderogas'></input>
                            <label><span style={{ color: 'red' }}>*</span>Start Date (MMDDYY)</label>
                            <input placeholder='012819'></input>
                            <label><span style={{ color: 'red' }}>*</span>List of Students (separated by commas)</label>
                            <input placeholder="Beyonce, Liv Tyler, Lupita Nyong'o"></input>
                            <button type='submit'>Save</button>
                        </form>
                        <button onClick={() => setShowForm(false)}>Wait! Go back</button>
                        <p style={{ fontSize: 'x-small', fontStyle: 'italic' }}><span style={{ color: 'red' }}>* </span>= required.</p>
                    </>
                    :
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p>Select a Cohort</p>
                        <form onSubmit={handleSubmitSelection}>
                            <select onChange={(ev)=>setSelection(ev.target.value)} value={selection}>
                                <option default>Select Below</option>
                                {cohorts && cohorts.map(x => <option key={x.id} value={x.id}>{x.name}</option>)} 
                            </select>
                            <button type='submit'>Submit</button>
                        </form>
                        <span>Or..
                        <button onClick={() => setShowForm(true)}>
                                Add a New Cohort
                        </button>
                        </span>
                    </div>
            }
        </div>
    )
}

export default CohortSelectionPage;
