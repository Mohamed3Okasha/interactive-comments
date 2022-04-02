import React, {useState} from 'react';
import CommentHeader from './CommentHeader';
import CommentScore from './CommentScore';
import AddComment from './AddComment';
import DeleteModal from './DeleteModal';
import CommentMobileFooter from './CommentMobileFooter';

const Reply = ({replyData, updateScore,currentUser, addReply, editComment, setDeleteModalState, deleteComment}) => {
    const[vote, setVote] = useState(false);
    const[replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(replyData.content);
    const [deleting, setDeleting] = useState(false);

    //a step to add a reply by calling addReply in the comment component
    let addNewReply = (newReply) => {
        addReply(newReply);
        setReplying(false);
    }

    //update a reply by calling editComment in the app component
    const updateComment = () => {
        editComment(content, replyData.id, 'reply');
        setEditing(false);
    }

    //delete reply by calling deleteComment in the app component
    const deleteReply = () => {
        deleteComment(replyData.id, 'reply');
        setDeleting(false);
    }

    //set reply content as a paragraph or textarea depending on the editing states
    const replyContent = () => {
        return !editing? (
            <p className="">
                <span className="replyingTo">@{replyData.replyingTo} </span>
                {replyData.content}
            </p>
            ) : (
                <textarea
                    className='content-edit-box'
                    value={content}
                    onChange= { (e) => {
                        setContent(e.target.value)
                    }
                    }
                />
                
            )
    }

    return (  
        <React.Fragment>
                <div className="comment">
                    <CommentScore 
                        commentData = {replyData}
                        updateScore = {updateScore}
                        type = 'reply'
                        vote = {vote}
                        setVote = {setVote}
                    />
                    <div className="comment-body">
                        <CommentHeader 
                            commentData= {replyData}
                            currentUser= {currentUser}
                            setReplying= {setReplying}
                            replying= {replying}
                            setEditing= {setEditing}
                            editing= {editing}
                            setDeleteModalState= {setDeleteModalState}
                            setDeleting= {setDeleting}
                            />
                        <div className="comment-content">
                            {replyContent()}
                            {editing &&(
                                <button className='update-btn' onClick={updateComment}>update</button>
                            )
                            }
                        </div>
                    </div>
                   <CommentMobileFooter 
                        commentData= {replyData}
                        updateScore= {updateScore}
                        type= 'reply'
                        vote= {vote}
                        setVote= {setVote}
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
                    replyingTo= {replyData.user.username}
                    postComment= {addNewReply}
                    />
                    }
                    {deleting && (
                    <DeleteModal 
                        setDeleting= {setDeleting}
                        setDeleteModalState= {setDeleteModalState}
                        deleteComment= {deleteReply}
                    />
                    )}
        </React.Fragment>
    );
}
 
export default Reply;