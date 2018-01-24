import React from 'react'
import NavLink from 'react-router-dom/es/NavLink'


const TodoFooter = ({ restCount, hasCompleted, clearCompleted }) => {
  let clearCompletedButton = null

  if (hasCompleted) {
    clearCompletedButton = (
      <button
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    )
  }
  return (
    <footer className="footer">
      <span className="todo-count"><strong>{restCount}</strong> item{restCount > 1 ? 's' : ''} left</span>
      <ul className="filters">
        <li><NavLink to="/" exact activeClassName="selected">All</NavLink></li>
        <li><NavLink to="/active" activeClassName="selected">Active</NavLink></li>
        <li><NavLink to="/completed" activeClassName="selected">Completed</NavLink></li>
      </ul>
      {clearCompletedButton}
    </footer>
  )
}

export default TodoFooter