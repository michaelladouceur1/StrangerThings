import './Posts.css';
import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faCommentDots, faExpand} from '@fortawesome/free-solid-svg-icons'

import {getPosts, deletePost, postMessage} from '../api';

const Posts = (props) => {
    let {posts, filteredPosts, currentUser, setPosts, setFilteredPosts} = props

    function searchPosts(event) {
        if(event.target.value) {
            let searchTerm = event.target.value.toLowerCase();
            let filtPosts = posts.filter((post) => {
                let postTitle = post.title.toLowerCase();
                return postTitle.includes(searchTerm)
            })
            // console.log(filtPosts);
            setFilteredPosts(filtPosts)
        } else {
            setFilteredPosts(posts)
        }
        console.log('FP: ', filteredPosts);
    }

    return (
        <div className='posts-container'>
            <div className='posts-menu'>
                <input type='text' placeholder='Search...' onChange={searchPosts}></input>

            </div>
            <div className='posts'>
            {
                filteredPosts.map((post) => {
                    if(post.active) {
                        return <PostCard
                        post={post}
                        currentUser={currentUser}
                        setPosts={setPosts} />
                    }
                })
            }
            </div>
        </div>
    )
}

const PostCard = (props) => {
    let {post, currentUser, setPosts} = props

    let [messageVisible, setMessageVisible] = useState(false)
    let [message, setMessage] = useState('');

    let authorUser = post.author.username === currentUser

    return (
        // Change functionality from using author.username to isAuthor from API
        <div className={authorUser ? 'post-card author' : 'post-card'}>
            <div className='post-card-header'>
                <div>
                    <h3>{post.title}</h3>
                    <h3>{post.price}</h3>
                </div>
                <div className='post-card-menu'>
                    {
                        authorUser
                        ? <button className='post-card-button' onClick={async (event) => {
                            console.log('Post ID in Post card: ', post._id);
                            await deletePost(post._id);
                            let posts = await getPosts();
                            setPosts(posts);
                        }}><FontAwesomeIcon icon={faTrash} /></button>
                        : ''
                    }
                    <button className='post-card-button' onClick={() => {
                        setMessageVisible(true);
                    }}><FontAwesomeIcon icon={faCommentDots} /></button>
                    <Link to={`/${post._id}`} className='post-card-button'><FontAwesomeIcon icon={faExpand} /></Link>
                </div>
            </div>
            <div className='post-card-body'>
                <p>Description: {post.description}</p>
                <p>Location: {post.location}</p>
                <p>Will Deliver: {post.willDeliver ? <span>Yes</span> : <span>No</span>}</p>
            </div>
            <div className='post-card-footer'>
                {
                    messageVisible
                    ? <div> 
                        <textarea placeholder='Message...' onChange={(event) => {
                            setMessage(event.target.value);
                        }}></textarea>
                        <button onClick={() => {
                            postMessage(post._id, message);
                            setMessageVisible(false);
                        }}>Submit</button>
                        <button onClick={() => {
                            setMessageVisible(false);
                        }}>Close</button>
                    </div>
                    : <div>
                        <h5>{post.author.username}</h5>
                        <h5>Created: {post.createdAt.split('T')[0]}</h5>
                        <h5>Updated: {post.updatedAt.split('T')[0]}</h5>
                    </div>
                }
            </div>
        </div>
    )
}

export default Posts