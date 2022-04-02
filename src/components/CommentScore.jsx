import React, { useState } from 'react';
import {ReactComponent as PlusIcon} from '../assets/images/icon-plus.svg'
import {ReactComponent as MinusIcon} from '../assets/images/icon-minus.svg'



const CommentScore = ({commentData, updateScore, type, vote, setVote}) => {
    const[score, setScore] = useState(commentData.score);
    

    //+1 to the socre of the reply/comment component
    const scoreUp = () => {
        if(vote === false){
            setScore(score + 1);
            updateScore(score, commentData.id, type);
            setVote(true);
        }
    }

    //-1 from the socre of the reply/comment component
    const scoreDown = () => {
        if(vote === true){
            setScore(score - 1);
            updateScore(score, commentData.id, type);
            setVote(false);
        }
    }

    return ( 
        <React.Fragment>
            <div className="comment-score">
                <button className="plus-icon" onClick={scoreUp}>
                    <PlusIcon />
                </button>
                <div className='score-counter'>
                    {score}
                </div>
                <button className="minus-icon" onClick={scoreDown}>
                    <MinusIcon />
                </button>
            </div>
        </React.Fragment>
     );
}
 
export default CommentScore;