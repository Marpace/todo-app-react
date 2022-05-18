import React from "react";

function DeleteAccountModal(props) {

    function handleDelete() {
        props.deleteUser()
    }

    function handleCancel() {
        props.setModal("hidden")
    }

    return(
        <div className={`delete-account-modal ${props.modal}`}>
            <div className="delete-account-modal__body">
                <div className="delete-modal-text">
                    <h3 className="text-upper">Delete account?</h3>
                    <p className="text-lower">All your lists will be deleted</p>
                </div>
                <div className="delete-account-modal__btns">
                    <button className="delete-modal__button" onClick={handleDelete}>Delete</button>
                    <button className="delete-modal__button" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}



export default DeleteAccountModal;