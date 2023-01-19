import React, { useState } from 'react'

const Form = ({ inputText, setInputText, setTodos, todos, setStatus, setAPIData }) => {
  const [error,setError] = useState(false)
  const inputTextHandler = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  }
  const submitTodohandler = (e) => {
    e.preventDefault();
    if(inputText) {
      setTodos([
        ...todos, { todo_item: inputText, completed: false, id: Math.random()*1000 }
      ])
      setAPIData(inputText)
      setInputText('')
    }
    else {
      setError(true)
      alert("Input Text can't be blank")
    }
  }
  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  return(
    <div>

    <form className='form'>
      <input value={inputText} onChange={inputTextHandler} placeholder='Enter Todo' type="text" className={`todo-input ${error ? "form-error" : ""}`} />
      <button onClick={submitTodohandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    <h1>{error ? "Error" : ""}</h1>
    </form>
    </div>
  );
}

export default Form;
