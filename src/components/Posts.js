import './Posts.css';
import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';

import {getPosts, deletePost, postMessage} from '../api';

const Posts = (props) => {
    let {posts, currentUser, setPosts} = props

    return (
        <div className='posts'>
            {
                posts.map((post) => {
                    if(post.active) {
                        return <PostCard
                        post={post}
                        currentUser={currentUser}
                        setPosts={setPosts} />
                    }
                })
            }
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
                <h3>{post.title}</h3>
                <h3>{post.price}</h3>
                {
                    authorUser
                    ? <button onClick={async (event) => {
                        console.log('Post ID in Post card: ', post._id);
                        await deletePost(post._id);
                        let posts = await getPosts();
                        setPosts(posts);
                    }}>Delete</button>
                    : ''
                }
            </div>
            <div className='post-card-body'>
                <p>Description: {post.description}</p>
                <p>Location: {post.location}</p>
                <p>Will Deliver: {post.willDeliver ? <span>Yes</span> : <span>No</span>}</p>
            </div>
            <div className='post-card-footer'>
                <button onClick={() => {
                    setMessageVisible(true);
                }}>Message</button>
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
                <Link to={`/${post._id}`}>Expand</Link>
            </div>
        </div>
    )
}

export default Posts