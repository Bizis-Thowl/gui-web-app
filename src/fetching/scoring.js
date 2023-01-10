const base_path = "http://localhost:5001"

export const fetchScores = (hist_length) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_path + "/api/examplebased/trustscores/" + hist_length, requestOptions)
    .then(response => response.json())
}