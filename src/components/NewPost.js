import './NewPost.css';
import React from 'react';

const NewPost = (props) => {
    // title, description, price, location, willdeliver
    return (
        <div className='new-post'>
            <form>
                <div className='input-group'>
                    <label htmlFor='post-title'>Title</label>
                    <input type='text' placeholder='Title...' id='post-title'></input>
                </div>
                <div className='input-group'>
                    <label htmlFor='post-description'>Description</label>
                    <textarea placeholder='Description...' id='post-description' rows='5'></textarea>
                </div>
                <div className='input-group'>
                    <label htmlFor='post-price'>Price ($)</label>
                    <input type='number' placeholder='Price...' id='post-price'></input>
                </div>
                <div className='input-group'>
                    <label htmlFor='post-location'>Location</label>
                    <input type='text' placeholder='Location...' id='post-location'></input>
                </div>
                <label>Will Deliver?</label>
                <input type='checkbox' value='true'></input>
            </form>
        </div>
    )
}

export default NewPost