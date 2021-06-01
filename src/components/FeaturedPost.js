import './FeaturedPost.css';
import React from 'react';

const FeaturedPost = (props) => {
    let {id} = props.match.params
    let {posts} = props
    let post = posts.filter((post) => post._id === id)[0]
    console.log(post)

    return (
        <div className='featured'>
            <div className='featured-post'>
                <div className='featured-post-header'>
                    <h1>Post</h1>
                    <h2>{post.title} ({post.price})</h2>
                    <h5>{post.author.username}</h5>
                </div>
                <p>{post.description}</p>
            </div>
            <div className='featured-messages'>
                <h1>Messages</h1>
                {
                    post.messages.map((message) => {
                        return <p>{message}</p>
                    })
                }
            </div>
        </div>
    )
}

export default FeaturedPost