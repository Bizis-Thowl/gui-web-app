import { label_assignment } from "../constants";

export function getHighestCount(arr) {
    const counts = {};
    for (const elem of arr) {
        counts[elem] = counts[elem] ? counts[elem] + 1 : 1;
    }
    
    let best_value = 0
    let best_risk_level = "low"

    for (const [key, value] of Object.entries(counts)) {
        if (best_value < value) {
            best_risk_level = key
            best_value = value
        }
    }

    return best_risk_level
}

export function getRiskAverage(arr) {
    let overallCount = 0
    const counts = {};
    for (const elem of arr) {
        counts[elem] = counts[elem] ? counts[elem] + 1 : 1;
        overallCount += 1
    }

    let sum = 0
    
    for (const [key, value] of Object.entries(label_assignment)) {

        sum += counts[key] * value
    }

    return sum / (overallCount * Object.entries(label_assignment).length)
}
