const JSON_URL_ROOT = 'https://api.jsonbin.io/b/5e54534d699c8612f6d41b76'
const headers = {
    'Content-Type': 'application/json',
    'secret-key': '$2b$10$H9MZieFWGmH.jLCvLpr7HO9uJA..HwJmAQKILpZaCYRzVG2UFNZT6',
    'versioning': false
  }

const fetchData = () => {
    return fetch(`${JSON_URL_ROOT}/1`, {
        headers: headers
    })
    .then(res=>res.json())
}

const postData = (data) => {
    return fetch(JSON_URL_ROOT, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
}
export const services = { 
    fetchData,
    postData
}