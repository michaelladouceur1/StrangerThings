import './Account.css';
import React from 'react';
import {useEffect, useState} from 'react';

import {getMeData} from '../api';
import PostCard from './PostCard';
import MessageCard from './MessageCard';

const Account = (props) => {
    let {accountData, posts, currentUser, setPosts, setFilteredPosts} = props

    return (
        <div className='account-container'>
            <div className='account-posts'>
                {
                    accountData.posts.map((post) => {
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
            <div className='account-messages'>
                {
                    accountData.messages.map((message) => {
                        return <MessageCard
                        message={message} />
                    })
                }
            </div>
        </div>
    )
} 

export default Account