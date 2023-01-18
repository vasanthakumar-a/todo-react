import React from 'react'
import Todo from './Todo'

const TodoList = ({ filteredTodos, todos, setTodos }) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map (todo => (
          <Todo todo={todo} todos={todos} setTodos={setTodos} key={todo.id} text={todo.text}/>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
