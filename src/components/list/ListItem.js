import { useState } from "react";

function ListItem(props) {

    function handleClick(){
        props.deleteItem(props.id);
    }

    function handleChecked(){
        props.checkItem(props.id, props.status)
    }  
    
    return (
        <div 
        className={`todo-list__item bg-${props.theme} ${props.filter === props.status || props.filter === "all" ? "show-flex" : "hidden"}`}
        id={props.id}
        >
            <button 
            onClick={handleChecked} 
            className={`todo-list__item-check ${props.status === "active" ? `border-${props.theme}` : "item-checked"} `}
            id={props.status}>
                <img className={`icon-check ${props.status === "active" ? "hidden" : "show"}`} src="./images/icon-check.svg" alt=""></img>
            </button>               
            <span className={`todo-list__item-text text-${props.theme} ${props.status === "active" ? "" : "line-through"}`}>{props.content}</span>
            <button className="todo-list__item-delete" onClick={handleClick}>
                <img className="item-delete__img" src="./images/icon-cross.svg" alt=""></img>
            </button>
        </div>
    );
};


export default ListItem;