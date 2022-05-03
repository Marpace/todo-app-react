import { useState } from "react";

function ListItem(props) {

    const base_url = "http://localhost:5000";
    // const base_url = "https://todo-api-6215.herokuapp.com"


    const [status, setStatus] = useState(props.status)

    function handleClick(){
        props.deleteItem(props.id);
    }

    function handleChecked(){
        
        fetch(`${base_url}/check-item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: props.id, status: status})
        })
        .then(response => response.json())
        .then((data) => {
            setStatus(data.newStatus);
            props.getItems();
            console.log(status)
        })
        
    }  
    
    return (
        <div 
        className={`todo-list__item bg-${props.theme} ${props.filter === status || props.filter === "all" ? "show-flex" : "hidden"}`}
        id={props.id}
        >
            <button 
            onClick={handleChecked} 
            className={`todo-list__item-check ${status === "active" ? `border-${props.theme}` : "item-checked"} `}
            id={status}>
                <img className={`icon-check ${status === "active" ? "hidden" : "show"}`} src="./images/icon-check.svg" alt=""></img>
            </button>               
            <span className={`todo-list__item-text text-${props.theme} ${status === "active" ? "" : "line-through"}`}>{props.content}</span>
            <button className="todo-list__item-delete" onClick={handleClick}>
                <img className="item-delete__img" src="./images/icon-cross.svg" alt=""></img>
            </button>
        </div>
    );
};


export default ListItem;