import React, { Component } from 'react'

const ENTER_KEY_CODE = 13

class TodoHeader extends Component {
  state = {
    inputValue: ''
  }

  addTodo = (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) return false

    const title = this.state.inputValue.trim()
    if (title) {
      this.props.addTodo(title)
      this.setState({ inputValue: '' })
    }
  }
  render() {
    return (
      <header>
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.inputValue}
          onChange={(e) => this.setState({ inputValue: e.target.value })}
          onKeyDown={(e) => this.addTodo(e)}
        />
      </header>
    )
  }
}

export default TodoHeader
