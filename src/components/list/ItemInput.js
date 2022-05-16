import { useState } from "react";


function ItemInput(props) {

    const [inputValue, setInputValue] = useState("");

    function handleChange(e){
        setInputValue(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.addItem(inputValue);
        setInputValue("");
    }

    return (
        <form onSubmit={handleSubmit} className={`input-form bg-${props.theme}`}>
            <input type="text" 
            placeholder="Create a new todo..." 
            className={`input-text-${props.theme}`} 
            value={inputValue}
            onChange={handleChange}
            required 
            autoFocus></input>
            <button type="submit" className="input-submit">ADD</button>
        </form>
    )
}








export default ItemInput;