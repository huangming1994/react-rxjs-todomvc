import React, { Component } from 'react'
import classnames from 'classnames'

class TodoItem extends Component {
  render() {
    const { id, title, completed } = this.props.todo
    const { removeTodo } = this.props
    const liClass = classnames({
      completed
    })

    return (
      <li className={liClass}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={(e) => {console.log(e)}}
          />
          <label onDoubleClick={() => {}}>{title}</label>
          <button
            className="destroy"
            onClick={() => removeTodo(id)}
          >
          </button>
        </div>
        <input
          type="text"
          className="edit"
          value={12}
          onChange={() => {}}
          onBlur={() => {}}
          onKeyDown={() => {}}
        />
      </li>
    )
  }
}

export default TodoItem
