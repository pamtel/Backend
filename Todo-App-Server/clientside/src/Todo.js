import React, {useState} from 'react'

function Todo() {
    const [todos, setTodos] = useState([]);
    const [textInput, setTextInput] = useState("");

    const handleChange = (e) => {
        setTextInput(e.target.value);
    }
    const addTodoHandler = () => {
      
        setTodos([
            ...todos,
            {
                id: todos.length,
                text: textInput,
            },
        ]);
        setTextInput("");
    }
    return (
        <div className="">
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" value={textInput} onChange={handleChange} placeholder="Add todo"/>
                <button onClick={addTodoHandler}>Add</button>
            </form>

            {todos.map((data) => {
                return (
                    <ul key={data.id} className="todoList">
                        <li>{data.text}</li>
                    </ul>
                )
            })}
        </div>
    )
}

export default Todo
