import { alibiAddress } from "../config";

const base_path = alibiAddress

export const fetchCounterfactuals = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_path + "/api/examplebased/counterfactuals", requestOptions)
    .then(response => response.json())
}