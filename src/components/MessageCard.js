import './MessageCard.css';
import React from 'react';

const MessageCard = (props) => {
    let {message} = props

    return (
        <div className='message-card'>
            <h3><b>Message posted on: </b>{message.post.title}</h3>
            <p>{message.content}</p>
        </div>
    )
}

export default MessageCard