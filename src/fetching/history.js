const base_path = "http://localhost:5000"

export const fetchHistory = (hist_length) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_path + "/api/history/" + hist_length, requestOptions)
    .then(response => response.json())
}

export const fetchHistoryAverage = (hist_length) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_path + "/api/history/average/" + hist_length, requestOptions)
    .then(response => response.json())
}
