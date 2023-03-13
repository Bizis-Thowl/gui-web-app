const base_path = "http://localhost:5000"

export const fetchAle = (currClass, feature) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_path + "/api/behaviour/ale/" + currClass + "/" + feature, requestOptions)
    .then(response => response.text())
}

export const fetchAle2d = (currClass, feature1, feature2) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_path + "/api/behaviour/ale2d/" + currClass + "/" + feature1 + "/" + feature2, requestOptions)
    .then(response => response.text())
}