import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/todo_lists"

function getAPIData() {
  return axios.get(API_URL).then((response) => response.data)
}

function App() {
  const [todoLists,setTodoLists] = useState([]);

  useEffect(() => {
    let mounted = true;
    getAPIData().then((items) => {
      if(mounted) {
        setTodoLists(items);
      }
    });
    return () => (mounted = false);
  });

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    filterHandler()
  }, [todos, status]);

  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break
      default:
        setFilteredTodos(todos);
        break
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Vasi's Todo List</h1>
      </header>

      <h4>Here are Todos from rails</h4>
      {todoLists.map((todo_item) => {
        return (
          <div key={todo_item.id}>
            <h5>{todo_item.todo_item}</h5>
            <p>{todo_item.status}</p>
          </div>
        )
      })}

      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus} />
      <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
