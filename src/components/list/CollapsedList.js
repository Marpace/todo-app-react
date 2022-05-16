import React from "react";

function CollapsedList(props){

    function handleView(){
        props.getSingleList(props.listId)
    }

    function handleDelete() {
        props.deleteList(props.listId)
    }

    return (
        <div className={`collapsed-wrap__list bg-${props.theme}`}>
            <div className="collapsed-wrap__list-text">
                <h4 className="collapsed-wrap__list-title">{props.listTitle}</h4>
                <span className="date-created">{props.dateCreated}</span>
            </div>
            <div className="collapsed-wrap__list-btns">
                <button onClick={handleView} className="collapsed-wrap__view-btn">View</button>
                <button onClick={handleDelete} className="collapsed-wrap__view-btn">Delete</button>
            </div>
        </div>          
    );
}


export default CollapsedList;