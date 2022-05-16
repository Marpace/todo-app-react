import React from "react";

function LogoutBtn(props) {

    function handleClick() {
        props.onLogout()
    }



    return (
        <button onClick={handleClick} className={`logout-btn button-${props.theme}`}>Logout</button>
    )
};



export default LogoutBtn;