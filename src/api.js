import axios from 'axios'

// import {setLocalToken, getLocalToken} from './utils'

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2104-uic-web-ft';
let token = '';

function returnHeaders() {
    console.log('Headers called...');
    console.log('Token: ', token);
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
        console.log('Login Token: ', token);
        return true
    } catch (error) {
        console.log('ERROR');
        console.error(error);
    }
}

// Add user data button when logged in

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
        let response = await axios.get(url, returnHeaders())
        let posts = await response.data.data.posts;
        console.log('API Posts: ', posts);
        console.log('API isArray: ', Array.isArray(posts));
        return posts
    } catch (error) {
        console.error(error);
    }
}

async function postPost(post) {
    let url = `${BASE_URL}/posts`;
    let newPost = {
        'post': post
    }
    try {
        let response = await axios.post(url, newPost, returnHeaders());
    } catch (error) {
        console.error(error);
    }
}

async function deletePost(id) {
    let url = `${BASE_URL}/posts/${id}`
    try {
        await axios.delete(url, returnHeaders())
        return true
    } catch (error) {
        console.error(error);
    }
}

export {loginRegisterUser, getMeData, getPosts, postPost, deletePost}