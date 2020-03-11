const JSON_URL_ROOT = 'http://localhost:3000/students'
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

const fetchData = () => {
    return fetch(`${JSON_URL_ROOT}`, {
        headers: headers
    })
    .then(res=>res.json())
}

const postData = (data) => {
    console.log('the data inside the services file: ', data)
    return fetch(JSON_URL_ROOT, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
}
export const services = { 
    fetchData,
    postData
}