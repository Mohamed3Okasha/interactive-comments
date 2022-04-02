import React, { useState } from 'react';

const AddComment = ({buttonValue, currentUserImg, replyingTo, postComment}) => {
    const replyingToUser = replyingTo ? `@${replyingTo}, `: '';
    const[comment, setComment] = useState('');
    let clickHandler = () =>{
        if(comment === '' || comment === ' ') return;

        const newComment={
            id: Math.floor(Math.random() * 100) + 5,
            content: `${comment}`,
            createdAt: 'today',
            score: 0,
            replyingTo: `${replyingTo}`,
            user: {
                image: { 
                  png: "./images/avatars/image-juliusomo.png",
                  webp: "./images/avatars/image-juliusomo.webp"
                },
                username: "juliusomo",
              },
            replies: [],
        }
        postComment(newComment);
        setComment('');
    }

    return ( 
        <div className="add-comment">
            <div className="user-image-container">
                <img src={currentUserImg} alt="profile-pic" className='user-img'/>
            </div>
            <textarea name="" id="" cols="30" rows="10" 
            className="comment-input"
            placeholder='Add comment'
            value={ replyingToUser + comment}
            onChange={(e) => {
                setComment(e.target.value.replace(replyingTo ? `@${replyingTo}, ` : "", ""));
            }}
            />
            <div className="send-btn-container">
                <img src={currentUserImg} alt="profile-pic" className='user-img'/>
                <button className='add-btn' onClick={clickHandler}>
                    {buttonValue}
                </button>
            </div>
        </div>
     );
}
 
export default AddComment;