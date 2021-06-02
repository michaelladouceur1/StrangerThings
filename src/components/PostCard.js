import './PostCard.css';
import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faCommentDots, faExpand} from '@fortawesome/free-solid-svg-icons'

import {getPosts, deletePost, postMessage} from '../api';

const PostCard = (props) => {
    let {post, currentUser, setPosts, setFilteredPosts} = props

    let [messageVisible, setMessageVisible] = useState(false)
    let [message, setMessage] = useState('');

    let authorUser = post.author.username === currentUser

    async function deletePost(event) {
        await deletePost(post._id);
        let posts = await getPosts();
        setPosts(posts);
        setFilteredPosts(posts);
    }

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
                        ? <button className='post-card-button' onClick={deletePost}><FontAwesomeIcon icon={faTrash} /></button>
                        : ''
                    }
                    {
                        currentUser.length > 0
                        ? <button className='post-card-button' onClick={() => {
                            setMessageVisible(!messageVisible);
                        }}><FontAwesomeIcon icon={faCommentDots} /></button>
                        : ''
                    }
                    <Link to={`/fp/${post._id}`} className='post-card-button'><FontAwesomeIcon icon={faExpand} /></Link>
                </div>
            </div>
            <div className='post-card-body'>
                <p><b>Description:</b> {post.description}</p>
                <p><b>Location:</b> {post.location}</p>
                <p><b>Will Deliver:</b> {post.willDeliver ? <span>Yes</span> : <span>No</span>}</p>
            </div>
            <div className='post-card-footer'>
                {
                    messageVisible
                    ? <div> 
                        <textarea placeholder='Message...' onChange={(event) => {
                            setMessage(event.target.value);
                        }}></textarea>
                        <button onClick={async () => {
                            await postMessage(post._id, message);
                            setMessageVisible(false);
                            let posts = await getPosts();
                            setPosts(posts);
                            setFilteredPosts(posts);
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

export default PostCard