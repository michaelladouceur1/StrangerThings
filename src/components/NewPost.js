import './NewPost.css';
import React from 'react';
import {useState} from 'react';

import {postPost, getPosts} from '../api'

const NewPost = (props) => {
    let {setPosts} = props

    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [price, setPrice] = useState('');
    let [location, setLocation] = useState('[On Request]');
    let [willDeliver, setWillDeliver] = useState(false);
    let [post, setPost] = useState({
        'title': '',
        'description': '',
        'price': '',
        'location': '',
        'willDeliver': false
      })

    async function submitPost(event) {
        event.preventDefault();
        setPost(
            post.title=title, 
            post.description=description,
            post.price=price,
            post.location=location,
            post.willDeliver=willDeliver)
        await postPost(post);
        clearNewPost();
        let posts = await getPosts();
        setPosts(posts);
    }

    // Function not clearing form when invoked
    function clearNewPost() {
        console.log('clearNewPost')
        setTitle('');
        setDescription('');
        setPrice('');
        setLocation('');
        setWillDeliver(false);
        setPost(
            post.title=title, 
            post.description=description,
            post.price=price,
            post.location=location,
            post.willDeliver=willDeliver
        )
    }

    return (
        <div className='new-post'>
            <form id='post-form' onSubmit={submitPost}>
                <div className='input-group'>
                    <label htmlFor='post-title'>Title</label>
                    <input type='text' placeholder='Title...' id='post-title' onChange={(event) => {
                        setTitle(event.target.value);
                    }}></input>
                </div>
                <div className='input-group'>
                    <label htmlFor='post-description'>Description</label>
                    <textarea placeholder='Description...' id='post-description' rows='5' onChange={(event) => {
                        setDescription(event.target.value);
                    }}></textarea>
                </div>
                <div className='input-group'>
                    <label htmlFor='post-price'>Price ($)</label>
                    <input type='text' placeholder='Price...' id='post-price' onChange={(event) => {
                        setPrice(event.target.value);
                    }}></input>
                </div>
                <div className='input-group'>
                    <label htmlFor='post-location'>Location</label>
                    <input type='text' placeholder='Location...' id='post-location' onChange={(event) => {
                        setLocation(event.target.value);
                    }}></input>
                </div>
                <div>
                    <label>Will Deliver?</label>
                    <input type='checkbox' onChange={(event) => {
                        let value = event.target.value === 'on' ? true : false;
                        setWillDeliver(value);
                    }}></input>
                </div>
                <button id='submit-post'>Submit</button>
            </form>
        </div>
    )
}

export default NewPost