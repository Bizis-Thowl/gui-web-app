const base_path = "http://localhost:5000"

export const fetchForceplot = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_path + "/api/forceplot", requestOptions)
    .then(response => response.json())
}

export const fetchForceplotMulti = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_path + "/api/forceplotmulti", requestOptions)
    .then(response => response.text())
}
