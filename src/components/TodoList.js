import { useState } from "react";



function TodoList(props) {

    const [listItems, setListItems] = useState();

    function onAddItem(item){
        setListItems(prevItems => [...prevItems, item]);
    };

    return (
        <div className="todo-list">
        {props.listItems.forEach(item => (
            <div className="todo-list__item">
                <img></img>
                <span>{item.value}</span>
            </div>
        ))}
        </div>
    )
}


export default TodoList;