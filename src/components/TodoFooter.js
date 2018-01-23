import React from 'react'
import NavLink from 'react-router-dom/es/NavLink'


function TodoFooter({ resetCount }) {
  let clearCompletedButton = null

  return (
    <footer className="footer">
      <span className="todo-count"><strong>{resetCount}</strong> item{resetCount > 1 ? 's' : ''} left</span>
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