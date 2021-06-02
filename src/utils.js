function setLocalToken(token) {
    console.log('Setting local token: ', token);
    localStorage.setItem('token', token);
}

function getLocalToken() {
    if(localStorage.getItem('token')) {
        console.log('Local token found: ', localStorage.getItem('token'));
        return localStorage.getItem('token');
    }
    return '';
}