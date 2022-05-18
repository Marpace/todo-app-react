import React from "react";

function DeleteListModal(props) {

    function handleDelete() {
        props.deleteList()
    }

    function handleCancel() {
        props.setDeleteListModal("hidden")
    }

    return (
        <div className={`delete-list-modal ${props.modal}`}>
            <div className="delete-list-modal__body">
                <h3 className="delete-modal-text">Delete {props.listTitle} list?</h3>
                <div className="delete-list-modal__btns">
                    <button className="delete-modal__button" onClick={handleDelete}>Delete</button>
                    <button className="delete-modal__button" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}


export default DeleteListModal