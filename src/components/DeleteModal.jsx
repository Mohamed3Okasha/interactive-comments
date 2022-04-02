import React from 'react';

const DeleteModal = ({setDeleting, setDeleteModalState, deleteComment}) => {

    const cancelBtnClicked = () => {
        setDeleting(false);
        setDeleteModalState(false);
    }

    const deleteBtnClicked = () => {
        deleteComment();
        setDeleteModalState(false);
    }

    return (  
        <div className="delete-confirmation-wrapper">
            <div className="delete-container">
                <h3 className="title">Delete Comment</h3>
                <p className="confrimation-message">
                    Are you sure you want to delete this comment? This will remove the comment and can't be undone.
                </p>
                <div className="btn-container">
                    <button className="cancel-btn"
                            onClick={cancelBtnClicked}
                    >No, Cancel</button>
                    <button className="delete-btn"
                            onClick={deleteBtnClicked}
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default DeleteModal;