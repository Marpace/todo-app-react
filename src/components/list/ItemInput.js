import { useState } from "react";


function ItemInput(props) {

    const [inputValue, setInputValue] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        props.addItem(inputValue, "active");
        setInputValue("");
    }

    return (
        <form onSubmit={handleSubmit} className={`input-form bg-${props.theme}`}>
            <input type="text" 
            placeholder="Create a new todo..." 
            className={`input-text-${props.theme}`} 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required 
            autoFocus></input>
            <button type="submit" className="input-submit">ADD</button>
        </form>
    )
}








export default ItemInput;