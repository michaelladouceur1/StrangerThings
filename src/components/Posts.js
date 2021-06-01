import './Posts.css';
import React from 'react';

const Posts = (props) => {
    let {posts, currentUser} = props

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
                        currentUser={currentUser} />
                    }
                })
            }
        </div>
    )
}

const PostCard = (props) => {
    let {post, currentUser} = props
    let authorUser = post.author.username === currentUser

    return (
        // Try to figure out how to do this using the isAuthor from the API. Not with author.username
        <div className={authorUser ? 'post-card author' : 'post-card'}>
            <div className='post-card-header'>
                <h3>{post.title}</h3>
                <h3>{post.price}</h3>
                {
                    authorUser
                    ? <button>Delete</button>
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
            </div>
        </div>
    )
}

export default Posts