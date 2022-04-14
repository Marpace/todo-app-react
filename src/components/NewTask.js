import { useState } from "react";



function NewTask(props) {

    const [value, setValue] = useState("");

    function handleChange(event){
        setValue(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();


    }


    return (
        <div className="new-task">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={value}></input>
                <button type="submit">ADD</button>
            </form>
        </div>
    )
}








export default NewTask;