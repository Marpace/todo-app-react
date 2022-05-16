


function ListFooter(props){

    function handleClick(e){
        props.applyFilter(e.target.id)
    }


    const item = props.itemsLeft === 1 ? "item" : "items"

    return (
        <div className={`todo-list__footer bg-${props.theme}`}>
            <span className="pending">{props.itemsLeft} {item} left</span>
            <div className={`todo-list__footer-filter`}>
                <span onClick={handleClick} id="all" className={`filter-option ${props.filter === "all" ? "filter-active" : ""}`}>All</span>
                <span onClick={handleClick} id="active" className={`filter-option ${props.filter === "active" ? "filter-active" : ""}`}>Active</span>
                <span onClick={handleClick} id="completed" className={`filter-option ${props.filter === "completed" ? "filter-active" : ""}`}>Completed</span>
            </div>
            <button onClick={props.clearCompleted} className="clear-completed-btn" type="submit">Clear completed</button>
        </div>
    )
}




export default ListFooter;
