import React from 'react';
import CommentBtn from './CommentBtn';

const CommentHeader = ({commentData, currentUser, setReplying, replying, setEditing, editing, setDeleting, setDeleteModalState}) => {
    return ( 
        <div className="comment-header">
            <img src={commentData.user.image.png} alt="profile-pic" className='user-img'/>
            <span className='username'>{commentData.user.username}</span>
            {commentData.user.username === currentUser.username? <span className="you-tag">you</span>: ''}
            <span className='create-time'>{commentData.createdAt}</span>
            <CommentBtn 
                commentData= {commentData}
                currentUser= {currentUser}
                setReplying= {setReplying}
                replying= {replying}
                setEditing= {setEditing}
                editing= {editing}
                setDeleting= {setDeleting}
                setDeleteModalState= {setDeleteModalState}
            />
         </div>
     );
}
 
export default CommentHeader;