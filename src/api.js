import axios from 'axios'

// import {setLocalToken, getLocalToken} from './utils'

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2104-uic-web-ft';
let token = '';

function returnHeaders() {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}

async function loginRegisterUser(method, user) {
    let url = `${BASE_URL}/users/${method}`;
    try {
        let response = await axios.post(url, user)
        token = response.data.data.token;
        getPosts();
    } catch (error) {
        console.log('ERROR');
        console.error(error);
    }
}

async function getMeData() {
    let url = `${BASE_URL}/users/me`;
    try {
        let response = await axios.get(url, returnHeaders())
        let data = response.data.data;
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

async function getPosts() {
    let url = `${BASE_URL}/posts`;
    try {
        let response = await axios.get(url)
        let posts = response.data.data.posts;
        console.log(posts);
    } catch (error) {
        console.error(error);
    }
}

async function setPost(post) {
    let url = `${BASE_URL}/posts`;
    try {
        let response = await axios.post(url, post, returnHeaders());
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export {loginRegisterUser, getMeData}