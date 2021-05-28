function setLocalToken(token) {
    localStorage.setItem('token', token);
}

function getLocalToken() {
    if(localStorage.getItem('token')) {
        return localStorage.getItem('token');
    }
    return '';
}