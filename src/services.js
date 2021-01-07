const JSON_URL_ROOT = 'http://localhost:6001/students'

const headers = () =>{
    return {'Content-Type': 'application/json',
    Accept: 'application/json'}
  }

const fetchData = () => {
    return fetch(JSON_URL_ROOT, {
        headers: headers()
    })
    .then(res=>res.json())
}

const postData = (data) => {
    return fetch(`${JSON_URL_ROOT}/${data.id}`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
}

const promiseMakerForReset = (data) => {
    return fetch(`${JSON_URL_ROOT}/${data.id}`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(data)
    })
}

const fetchCohorts = () => {
    return fetch('http://localhost:3000/cohort-names', {
        headers: headers()
    })
    .then(res=>res.json())
}
const getStudentData = (selection) => {
    return fetch(`http://localhost:3000/cohorts/${selection}`, {
        headers: headers()
    })
    .then(res=>res.json())
}

export const services = { 
    fetchData,
    postData,
    promiseMakerForReset,
    fetchCohorts,
    getStudentData
}