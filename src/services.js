const JSON_URL_ROOT = 'http://localhost:3000/students/1'
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
    return fetch(`${JSON_URL_ROOT}/studentials/${data.id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
}

export const services = { 
    fetchData,
    postData
}

// currently the data is all messed up because of trying to work around json-server's particularities