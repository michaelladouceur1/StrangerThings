import './Posts.css';
import React from 'react';

import {getPosts, deletePost} from '../api';

const Posts = (props) => {
    let {posts, currentUser, setPosts} = props

    // IMPORTANT: active, isAuthor
    // DISPLAY: author -> username, createdAt, description, location, price, title, updatedAt, willDeliver
    // OPEN: messages
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
    let authorUser = post.author.username === currentUser

    return (
        // Try to figure out how to do this using the isAuthor from the API. Not with author.username
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
                <h5>{post.author.username}</h5>
                <h5>Created: {post.createdAt.split('T')[0]}</h5>
                <h5>Updated: {post.updatedAt.split('T')[0]}</h5>
                {/* Change post id to appended data onto post-card */}
                <h5 className='post-id'>Post ID: {post._id}</h5>
            </div>
        </div>
    )
}

export default Posts