import React from 'react';
import CommentScore from './CommentScore';
import CommentBtn from './CommentBtn';

const CommentFooter = ({commentData, updateScore, type, vote, setVote, 
                        currentUser, setReplying, replying, setEditing, 
                        editing, setDeleting, setDeleteModalState}) => {
    return ( 
        <React.Fragment>
            <div className="comment-mobile-footer">
            <CommentScore 
                        commentData = {commentData}
                        updateScore = {updateScore}
                        type = {type}
                        vote = {vote}
                        setVote = {setVote}
            />
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
        </React.Fragment>
     );
}
 
export default CommentFooter;