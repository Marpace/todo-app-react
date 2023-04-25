


function Filters(props){

    function handleClick(e){
        props.applyFilter(e.target.id);
    }

    console.log(props.showFilters)

    return(
        
    <div className={`filter bg-${props.theme} ${props.showFilters ? "" : "hidden"}`}>
    <span onClick={handleClick} id="all" className={`filter-option ${props.filter === "all" ? "filter-active" : ""}`}>All</span>
    <span onClick={handleClick} id="active" className={`filter-option ${props.filter === "active" ? "filter-active" : ""}`}>Active</span>
    <span onClick={handleClick} id="completed" className={`filter-option ${props.filter === "completed" ? "filter-active" : ""}`}>Completed</span>
    </div>

    )
}

export default Filters;