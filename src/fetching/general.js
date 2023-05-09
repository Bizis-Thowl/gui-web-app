import { backendAddress } from "../config";

const base_path = backendAddress

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

export const fetchPred = (dp) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(dp),
        redirect: 'follow'
    };

    return fetch(base_path + "/api/general/predict", requestOptions)
    .then(response => response.json())
}