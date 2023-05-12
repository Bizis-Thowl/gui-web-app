export function uploadClicks(click, user) {

    const serverAddress = "https://xai-limited-choice-default-rtdb.europe-west1.firebasedatabase.app/";

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(click);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverAddress + "clicks/" + user + ".json", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export function uploadFeedback(feedback, user) {

    const serverAddress = "https://xai-limited-choice-default-rtdb.europe-west1.firebasedatabase.app/";

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(feedback);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverAddress + "feedback/" + user + ".json", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export function uploadOrder(order, user) {

    const serverAddress = "https://xai-limited-choice-default-rtdb.europe-west1.firebasedatabase.app/";

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(order);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverAddress + "order/" + user + ".json", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}