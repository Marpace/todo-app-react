

function Header(props){
    

    function handleClick(e){
        const theme = e.target.id
        props.changeTheme(theme);
    }



    return (
        <div className="header">
            <h1>TODO</h1>
            <button className={props.theme === "light" ? "show" : "hidden"} onClick={handleClick}>
                <img 
                src="./images/icon-moon.svg" 
                alt="half moon"
                id="dark">
                </img>
            </button>
            <button className={props.theme === "dark" ? "show" : "hidden"} onClick={handleClick} >
                <img 
                src="./images/icon-sun.svg" 
                alt="sun"
                id="light"></img>
            </button>
        </div>
    )
}



export default Header;