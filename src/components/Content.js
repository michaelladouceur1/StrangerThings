import './Content.css';
import React from 'react';

import Posts from './Posts';
import NewPost from './NewPost';

const Content = (props) => {
    return (
        <main>
            <Posts />
            <NewPost />
        </main>
    )
}

export default Content