import React from "react";

function BackToListsBtn(props) {

    function handleClick() {
        props.setSingleList(null)
        props.setHeader("TODO")
        props.removeSingleList()
    }

    return (
        <div className="back-to-lists-wrap">
            <button onClick={handleClick} className={`back-to-lists-btn button-${props.theme}`}>Back to lists</button>
        </div>
    )
};


export default  BackToListsBtn;