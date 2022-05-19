import React, { useState } from "react";

function NewListBtn(props){

    const [formVisibility, setFormVisibility] = useState("hidden");
    const [buttonVisibility, setButtonVisibility] = useState("show");
    const [titleInputValue, setTitleInputValue] = useState("")

    function handleClick() {
        setFormVisibility(formVisibility === "hidden" ? "show-flex" : "hidden");
        setButtonVisibility(buttonVisibility === "show" ? "hidden" : "show")
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleClick();
        setTitleInputValue("");
        props.createList(titleInputValue)
    }

    function handleChange(e){
        setTitleInputValue(e.target.value)
    }

    return (
        <div className={`create-list`}>
            <button onClick={handleClick} className={`new-list-btn ${buttonVisibility} button-${props.theme}`}>New list</button>
            <form onSubmit={handleSubmit} className={`new-list-form ${formVisibility}`}>
                <input 
                    className={`text-${props.theme}`}
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Title" 
                    value={titleInputValue}
                    autoFocus
                ></input>
                {/* <input 
                    className={`text-${props.theme}`}
                    onChange={handleChange} 
                    type="date" 
                    placeholder="Deadline" 
                    value={titleInputValue}
                ></input> */}
                <div className="new-list-form-btns">                   
                    <button className={`button-${props.theme}`} type="submit">Create</button>
                    <button className={`button-${props.theme}`} onClick={handleClick} type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
}


export default NewListBtn;