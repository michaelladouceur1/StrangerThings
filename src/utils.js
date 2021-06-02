function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getLocalToken(key) {
    if(localStorage.getItem(key)) {
        console.log('Local storage found for: ', key)
        return localStorage.getItem(key);
    }
    return '';
}

export {setLocalStorage, getLocalToken}