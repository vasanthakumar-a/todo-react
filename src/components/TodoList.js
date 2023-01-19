import React from 'react'
import Todo from './Todo'

const TodoList = ({ filteredTodos, todos, setTodos, deleteTodo, completeTodo, setAPIData, updateAPIData }) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map (todo => (
          <Todo todo={todo} todos={todos} setTodos={setTodos} key={todo.id} text={todo.todo_item} deleteTodo={deleteTodo} completeTodo={completeTodo} setAPIData={setAPIData} updateAPIData={updateAPIData} />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
