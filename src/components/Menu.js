import {useState} from "react";

function Menu(props) {

  
  const [menuIsOpen, setMenuIsOpen] = useState(false);


  return (
    <div className="menu">
      <div onClick={() => setMenuIsOpen(prev => prev ? false : true)} className="menu-toggler">
        <div className={`menu-toggler__line line-1 ${menuIsOpen ? "line-1-open" : "line-1-close"}`}></div>
        <div className={`menu-toggler__line line-2 ${menuIsOpen ? "line-2-open" : "line-2-close"}`}></div>
        <div className={`menu-toggler__line line-3 ${menuIsOpen ? "line-3-open" : "line-3-close"}`}></div>
      </div>
      {/* <img onClick={() => setMenuIsOpen(prev => prev ? false : true)} className="menu-toggler" src="./images/menu_icon.svg"></img> */}
      <div className={`side-menu ${menuIsOpen ? "menu-shown" : "menu-hidden"}`}>
        <div className={`side-menu__inner menu-${props.theme}`}>
          <div className="side-menu__inner-top">
            <img 
                className={`theme-icon ${props.theme === "light" ? "show" : "hidden"}`}
                onClick={(e) => props.changeTheme(e.target.id)}
                src="./images/icon-moon.svg" 
                alt="half moon icon"
                id="dark">
            </img>
            <img 
                className={`theme-icon ${props.theme === "dark" ? "show" : "hidden"}`}
                onClick={(e) => props.changeTheme(e.target.id)}
                src="./images/icon-sun.svg" 
                alt="sun icon"
                id="light">
            </img>
            <span onClick={props.userLogout} className="logout-btn">Logout</span>
          </div>
          <p className="side-menu__inner-option">Create list</p>
          <p className="side-menu__inner-option">Edit lists</p>
          <p onClick={() => props.setShowModal(true)} className="side-menu__inner-option">Delete account</p>
        </div>
      </div>
    </div>
  )

}

export default Menu;