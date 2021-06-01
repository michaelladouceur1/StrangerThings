import './Content.css';
import React from 'react';

import Posts from './Posts';
import NewPost from './NewPost';

const Content = (props) => {
    let {posts} = props
    return (
        <main>
            <Posts
            posts={posts} />
            <NewPost />
        </main>
    )
}

export default Content