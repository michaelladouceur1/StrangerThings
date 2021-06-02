import './Posts.css';
import React from 'react';

import PostCard from './PostCard';

const Posts = (props) => {
    let {posts, filteredPosts, currentUser, setPosts, setFilteredPosts} = props

    function searchPosts(event) {
        if(event.target.value) {
            let searchTerm = event.target.value.toLowerCase();
            let filtPosts = posts.filter((post) => {
                let title = post.title.toLowerCase();
                let description = post.description.toLowerCase();
                let price = post.price.toLowerCase();
                let location = post.location.toLowerCase();
                let username = post.author.username.toLowerCase();

                return (title.includes(searchTerm)
                    || description.includes(searchTerm)
                    || price.includes(searchTerm)
                    || location.includes(searchTerm)
                    || username.includes(searchTerm))
            })
            setFilteredPosts(filtPosts)
        } else {
            setFilteredPosts(posts)
        }
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
                        setPosts={setPosts}
                        setFilteredPosts={setFilteredPosts} />
                    }
                })
            }
            </div>
        </div>
    )
}

export default Posts