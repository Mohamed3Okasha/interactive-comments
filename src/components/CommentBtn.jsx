import React, {useState, useEffect} from 'react';

import { ReactComponent as IconReply } from '../assets/images/icon-reply.svg';
import { ReactComponent as IconEdit } from '../assets/images/icon-edit.svg';
import { ReactComponent as IconDelete } from '../assets/images/icon-delete.svg';
import axios from 'axios';

const CommentBtn = ({commentData, currentUser, setReplying, replying, setEditing, editing, setDeleting, setDeleteModalState}) => {
   
    //toggle the states of Replying in coment/reply component
    const showAddComment = () => {
        replying? setReplying(false) : setReplying(true);
    }

    //toggle the states of Deleting in comment/reply component and setDeleteModalState in app component
    const showDeleteModal = () => {
        setDeleting(true);
        setDeleteModalState(true);
    }
    
    //toggle the states of Editing in comment/reply component
    const showEditComment = () => {
        editing? setEditing(false) : setEditing(true);
    }

    return ( 
        <div className="comment-btn">
            <button className={`reply-btn${!(commentData.user.username === currentUser.username) ? "" : " display-none"}`}
                    onClick={() => showAddComment()}
            >
                <IconReply /> Reply
            </button>
            <button className={`delete-btn${(commentData.user.username === currentUser.username) ? "" : " display-none"}`}
                    onClick= {showDeleteModal}
            >
                <IconDelete /> Delete
            </button>
            <button className={`edit-btn${(commentData.user.username === currentUser.username)? "" : " display-none"}`}
                    onClick= {() =>showEditComment()}
            >
                <IconEdit /> Edit
            </button>
        </div>
        
     );
}
 
export default CommentBtn;