const base_path = "http://localhost:5000"

export const fetchFeaturelist = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_path + "/api/general/featurelist", requestOptions)
    .then(response => response.json())
}

export const fetchCurrentDp = (length) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_path + "/api/general/currentdp/" + length, requestOptions)
    .then(response => response.json())
}