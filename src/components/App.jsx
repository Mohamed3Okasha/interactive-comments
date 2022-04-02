import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import '../assets/style/app.css'
import AddComment from './AddComment';

const App = () => {
    const [commentsData, setCommentsData] = useState({
        comments: [],
        currentUser: {
                "image": { 
                  "png": "",
                  "webp": ""
                },
                "username": ""
        }
    });
    const [deleteModalState, setDeleteModalState] = useState(false);

    //fetch data from json file using axios
    useEffect(async () => {
        const {data} = await axios.get('DB/data.json');
        setCommentsData(data);

        // const commentsCall = await axios.get('http://localhost:3000/comments');
        // const currentUserCall = await axios.get('http://localhost:3000/currentUser');
        // const cloneCommentsData = {...commentsData};
        // cloneCommentsData.comments = commentsCall.data;
        // cloneCommentsData.currentUser = currentUserCall.data;
    }
    , []);
    

    //add the overflow:hidden to stop body scroll on delete status
    useEffect(() => {
        deleteModalState? document.body.classList.add('overflow-hidden') :
                        document.body.classList.remove('overflow-hidden');
    }, [deleteModalState])

    //add comments to the app states
    let postComment = (newComment) => {
        let cloneCommentsData = {...commentsData};
        cloneCommentsData.comments.push(newComment)
        setCommentsData(cloneCommentsData);
    }

    //add replies to the app states
    let postReply = (newReplies, id) => {
        let cloneCommentsData = {...commentsData};
        cloneCommentsData.comments.forEach((comment) => {
            if(comment.id === id){
                comment.replies = [...newReplies]
            }
        });
        setCommentsData(cloneCommentsData);

    }

    //edit comments in the app states
    const editComment = (content, id, type) => {
        let cloneCommentsData = {...commentsData};

        if(type === 'comment'){
            cloneCommentsData.comments.forEach((comment) => {
                if(comment.id == id){
                    comment.content = content;
                }
            })

        } else if(type === 'reply'){
            cloneCommentsData.comments.forEach((comment) => {
                comment.replies.forEach((reply) => {
                    if(reply.id === id){
                        reply.content = content;
                    }
                })
            })
        }
    }

    //edit comments/replies in the app states
    const deleteCommentApp = (id, type, parentCommentId) => {
        let cloneCommentsData = {...commentsData};
        if(type === 'comment'){
            cloneCommentsData.comments = cloneCommentsData.comments.filter((comment) => comment.id !== id);
        } else if(type === 'reply')   {
            cloneCommentsData.comments.forEach((comment) => {
                if(comment.id === parentCommentId){
                    comment.replies = comment.replies.filter((reply) => reply.id !== id);
                }
            });
        }
        setCommentsData(cloneCommentsData);
    }

    //update score in the app states
    let updateScore = async (score, id, type) => {
        let cloneCommentsData = {...commentsData};
        if(type === 'comment') {
            cloneCommentsData.comments.forEach((comment) => {
                if(comment.id === id){
                    comment.score = score;
                    
                }
            });
        } else if (type === 'reply') {
            cloneCommentsData.comments.forEach((comment) => {
                comment.replies.forEach((reply) => {
                    if(reply.id === id){
                        reply.score = score;
                    }
                })
            })
        }
        setCommentsData(cloneCommentsData);
        //Decided to focus on frontend, later to handle the backend update call 
    }

    return (
        <React.Fragment>
            <main className='App'>
                {commentsData.comments.map((comment) => (
                    <Comment 
                        key = {comment.id}
                        commentData = {comment}
                        currentUser = {commentsData.currentUser}
                        updateScore = {updateScore}
                        postReply = {postReply}
                        editComment = {editComment}
                        deleteCommentApp = {deleteCommentApp}
                        setDeleteModalState = {setDeleteModalState}
                    />
                ))}
            
                    <AddComment 
                    buttonValue = {'send'}
                    currentUserImg = {commentsData.currentUser.image.png}
                    replyingToUser= {''}
                    postComment = {postComment}
                    />
                
            </main>
        </React.Fragment>
     );
}
 
export default App;