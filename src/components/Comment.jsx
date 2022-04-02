import React, { useState } from 'react';
import CommentMobileFooter from './CommentMobileFooter';
import CommentHeader from './CommentHeader';
import CommentScore from './CommentScore';
import Reply from './Reply';
import AddComment from './AddComment';
import DeleteModal from './DeleteModal';

const Comment = ({commentData, currentUser, updateScore, postReply, editComment, deleteCommentApp, setDeleteModalState}) => {
    const [vote, setVote] = useState(false);
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(commentData.content);
    const [deleting, setDeleting] = useState(false);

    //add a reply by calling postReply in the app component
    const addReply = (newReply) => {
        const cloneReplies = [...commentData.replies, newReply];
        postReply(cloneReplies, commentData.id)
        setReplying(false);
    }

    //update a comment by calling editComment in the app component
    let updateComment = () => {
        editComment(content, commentData.id, 'comment');
    }
    
    //adda reply by calling deleteCommentApp in the app component
    const deleteComment = (id, type) => {
        const finalId = (id !== undefined)? id : commentData.id;
        const finalType = (type !== undefined)? type: 'comment';
        deleteCommentApp(finalId, finalType, commentData.id);
        setDeleting(false);
    }
    
    return ( 
        <React.Fragment>
            <div className= {
                `comment-container 
                 ${commentData.replies[0] !== undefined ? 'reply-container-gap' : ''}`
            }>
                <div className="comment">
                    <CommentScore 
                        commentData = {commentData}
                        updateScore = {updateScore}
                        type = 'comment'
                        vote = {vote}
                        setVote = {setVote}
                    />
                    <div className="comment-body">
                        <CommentHeader 
                            commentData = {commentData}
                            currentUser = {currentUser}
                            setReplying = {setReplying}
                            replying= {replying}
                            setEditing= {setEditing}
                            editing= {editing}
                            setDeleteModalState = {setDeleteModalState}
                            setDelteting= {setDeleting}
                        />
                        <div className='comment-content'>
                            {!editing? (<p>
                            {commentData.content}
                            </p>
                            ) : (
                                <textarea
                                    className='content-edit-box'
                                    value={content}
                                    onChange= { (e) => {
                                        setContent(e.target.value)
                                    }
                                    }
                                >
                                </textarea>
                            )}
                            {editing &&(
                                <button className='update-btn' onClick={updateComment}>update</button>
                            )
                            }
                        </div>
                    </div>
                
                {/* A custom footer for mobile style */}
                    <CommentMobileFooter 
                        commentData = {commentData}
                        updateScore = {updateScore}
                        type = 'comment'
                        vote = {vote}
                        setVote = {setVote}
                        currentUser= {currentUser}
                        setReplying= {setReplying}
                        replying= {replying}
                        setEditing= {setEditing}
                        editing= {editing}
                        setDeleting= {setDeleting}
                        setDeleteModalState= {setDeleteModalState}
                    />
                </div>
                
                {replying &&
                <AddComment 
                buttonValue = {'reply'}
                currentUserImg = {currentUser.image.png}
                replyingTo= {commentData.user.username}
                postComment = {addReply}
                />
                }

                {(commentData.replies !== []) && 
                (
                    <div className="reply-container">
                        {commentData.replies.map( (reply) => (
                            <Reply 
                                key={reply.id}
                                replyData = {reply}
                                updateScore = {updateScore}
                                currentUser = {currentUser}
                                addReply = {addReply}
                                editComment = {editComment}
                                setDeleteModalState= {setDeleteModalState}
                                deleteComment= {deleteComment}
                                />
                                ))}
                    </div>
                )}

                {deleting && (
                    <DeleteModal 
                        setDeleting= {setDeleting}
                        setDeleteModalState= {setDeleteModalState}
                        
                    />
                )}

            </div>
        </React.Fragment>
     );
}
 
export default Comment;