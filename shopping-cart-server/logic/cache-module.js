let dataMap = new Map();
function get(key) {
    console.log(dataMap);
    return dataMap.get(key);
}

function set(key, value) {
    dataMap.set(key, value);
}

module.exports = {
    set,
    get,
    dataMap
}