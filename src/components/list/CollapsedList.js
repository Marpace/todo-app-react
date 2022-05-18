import React, { useState } from "react";
import DeleteListModal from "../modals/DeleteListModal";

function CollapsedList(props){
    
    const [deleteListModal, setDeleteListModal] = useState("hidden")
    
    
    function handleView(){
        props.getSingleList(props.listId)
    }

    function handleDelete() {
        props.deleteList(props.listId);
    }


    function handleModal() {
        setDeleteListModal("show-flex")
    }


    return (
        <div className={`collapsed-wrap__list bg-${props.theme}`}>
            <div className="collapsed-wrap__list-text">
                <h4 className="collapsed-wrap__list-title">{props.listTitle}</h4>
                <span className="date-created">{props.dateCreated}</span>
            </div>
            <div className="collapsed-wrap__list-btns">
                <button onClick={handleView} className="collapsed-wrap__view-btn">View</button>
                <button onClick={handleModal} className="collapsed-wrap__view-btn">Delete</button>
            </div>
            <DeleteListModal 
                modal={deleteListModal}
                listTitle={props.listTitle}
                listId={props.lidtId}
                deleteList={handleDelete}
                setDeleteListModal={setDeleteListModal}
            />
        </div>          
    );
}


export default CollapsedList;