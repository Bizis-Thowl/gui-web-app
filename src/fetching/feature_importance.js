import { backendAddress } from "../config";

const base_path = backendAddress

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

export const fetchSingleFi = (dp, pred) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            dp_dict: dp,
            pred: pred
        }),
        redirect: 'follow'
    };

    return fetch(base_path + "/api/featureimportance/single", requestOptions)
    .then(response => response.json())
}

