const JSON_URL_ROOT = 'http://localhost:6001/students'
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

const fetchData = () => {
    return fetch(JSON_URL_ROOT, {
        headers: headers
    })
    .then(res=>res.json())
}

const postData = (data) => {
    return fetch(`${JSON_URL_ROOT}/${data.id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
}

const promiseMakerForReset = (data) => {
    return fetch(`${JSON_URL_ROOT}/${data.id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
    })
}

export const services = { 
    fetchData,
    postData,
    promiseMakerForReset
}

// currently the data is all messed up because of trying to work around json-server's particularities