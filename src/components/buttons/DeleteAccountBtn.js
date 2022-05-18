import React from "react";


function DeleteAccountBtn(props) {

    function handleDelete() {
        props.setModal("show-flex")
    }

    return (
        <button className={`delete-account-btn button-${props.theme}`} onClick={handleDelete}>Delete account</button>
    )
}



export default DeleteAccountBtn;