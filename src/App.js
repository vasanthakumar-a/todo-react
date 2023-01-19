import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/todo_lists/"

function getAPIData() {
  return axios.get(API_URL).then((response) => response.data)
}

function setAPIData(todo) {
  return axios.post(API_URL, { todo_list: { todo_item: todo, completed: false, } }).then((response) => response.data).catch((error) => console.log(error));
}

function updateAPIData(updatedText,todo) {
  return axios.patch(API_URL+todo.id, { todo_list: { todo_item: updatedText, completed: todo.completed, } }).then((response) => response.data).catch((error) => console.log(error));
}

function deleteTodo(todo) {
  return axios.delete(API_URL+todo.id, { todo_list: { id: todo.id } }).then((response) => response.data).catch((error) => console.log(error));
}

function completeTodo(todo) {
  return axios.patch(API_URL+todo.id, { todo_list: { completed: !todo.completed } }).then((response) => response.data).catch((error) => console.log(error));
}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let mounted = true;
    getAPIData().then((items) => {
      if(mounted) {
        setTodos(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const [inputText, setInputText] = useState("");
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
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus} setAPIData={setAPIData} />
      <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos} deleteTodo={deleteTodo} completeTodo={completeTodo} setAPIData={setAPIData} updateAPIData={updateAPIData} />
    </div>
  );
}

export default App;
