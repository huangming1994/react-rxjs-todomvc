import React, { Component } from 'react'
import classnames from 'classnames'

const ESC_KEY_CODE = 27
const ENTER_KEY_CODE = 13

class TodoItem extends Component {
  state = {
    editing: false,
    editValue: this.props.todo.title
  }

  editing = () => {
    this.setState({ editing: true }, () => this.editInput.focus())
  }

  onChange = (event) => {
    const value = event.target.value
    this.setState({ editValue: value })
  }

  onBlur = (event, id) => {
    const { editValue } = this.state
    if (!editValue) {
      return this.props.removeTodo(id)
    }
    this.submitEdit(id, event.target.value)
  }

  onKeyDown = (event, id) => {
    if (event.keyCode === ESC_KEY_CODE) return this.cancelEdit()
    if (event.keyCode === ENTER_KEY_CODE) return this.submitEdit(id, event.target.value)
  }

  cancelEdit = () => this.setState({ editing: false })

  submitEdit = (id, value) => {
    this.cancelEdit()
    this.props.updateTodo({ uuid: id, newTitle: value })
  }

  render() {
    const { id, title, completed } = this.props.todo
    const { removeTodo, toggleCompleted } = this.props
    const { editing, editValue } = this.state
    const liClass = classnames({
      editing,
      completed
    })

    return (
      <li className={liClass}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={() => toggleCompleted(id)}
          />
          <label onDoubleClick={this.editing}>{title}</label>
          <button
            className="destroy"
            onClick={() => removeTodo(id)}
          >
          </button>
        </div>
        <input
          ref={input => (this.editInput = input)}
          type="text"
          className="edit"
          value={editValue}
          onChange={this.onChange}
          onBlur={(event) => this.onBlur(event, id)}
          onKeyDown={(event) => this.onKeyDown(event, id)}
        />
      </li>
    )
  }
}

export default TodoItem
