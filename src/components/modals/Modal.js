import React from "react";

function DeleteAccountModal(props) {

    return(
        <div className={`delete-account-modal ${props.showModal ? "" : "hidden"}`}>
            <div className="delete-account-modal__body">
                <div className="delete-modal-text">
                    <h3 className="text-upper">{props.lineOne}</h3>
                    <p className="text-lower">{props.lineTwo}</p>
                </div>
                <div className="delete-account-modal__btns">
                    <button className="delete-modal__button" onClick={() => props.buttonFunction()}>{props.buttonContent}</button>
                    <button className="delete-modal__button" onClick={() => props.setShowModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
 


export default DeleteAccountModal;