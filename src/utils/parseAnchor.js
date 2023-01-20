export const parseAnchor = (anchor) => {
    const splits = anchor.split(" ");
    let feature;
    let value1;
    let cond1;
    let value2;
    let cond2;

    if (splits.length === 5) {
        value1 = splits[0]
        cond1 = splits[1]
        feature = splits[2]
        cond2 = splits[3]
        value2 = splits[4]
    } else {
        feature = splits[0]
        cond2 = splits[1]
        value2 = splits[2]
    }

    return [value1, cond1, feature, cond2, value2]
}