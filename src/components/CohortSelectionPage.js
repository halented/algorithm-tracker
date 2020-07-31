import React, {useState, useEffect} from 'react';
import { services } from '../services';

function CohortSelectionPage(props) {
    const [showForm, setShowForm] = useState(false)
    const { setStudents, setShowHome} = props
    const [cohorts, setCohorts] = useState([])

    useEffect(() => {
        services.fetchCohorts()
        .then(data=>setCohorts(data))
    }, []);

    return (
        <div>
            {
                showForm?
                <>
                <form style={{display:'flex', flexDirection:'column'}}>
                    <label>Cohort Name (optional)</label>
                    <input placeholder='Dixon Ticonderogas'></input>
                    <label><span style={{color:'red'}}>*</span>Start Date (MMDDYY)</label>
                    <input placeholder='012819'></input>
                    <label><span style={{color:'red'}}>*</span>List of Students (separated by commas)</label>
                    <input placeholder="Beyonce, Liv Tyler, Lupita Nyong'o"></input>
                    <button type='submit'>Save</button>
                </form>
                <button onClick={()=>setShowForm(false)}>Wait! Go back</button>
                <p style={{fontSize:'x-small', fontStyle:'italic'}}><span style={{color:'red'}}>* </span>= required.</p>
                </>
                :
                <div style={{display:'flex', flexDirection:'column'}}>
                    <p>Select a Cohort</p>
                    <form>
                        <select>
                            {cohorts && cohorts.map(x=> <option>{x}</option>)}
                        </select>
                        <button type='submit'>Submit</button>
                    </form>
                    <span>Or..<button onClick={()=>setShowForm(true)}>Add a New Cohort</button></span>
                </div>
            }
        </div>
    )
}

export default CohortSelectionPage;
