
function fetch(key) {
    return localStorage.getItem(key);
}

function fetchOrDefault(key, defaultValue) {
    content = fetch(key);
    if (!content) {
        content = defaultValue;
    }
    return content;

}

function store(key, content) {
    return localStorage.setItem(key, content);
}

function fetchAndExecute(key, executeCallback) {
    content = fetch(key);
    if (content == "undefined") {
        return false;
    }
    executeCallback(content);
    return true;
}

