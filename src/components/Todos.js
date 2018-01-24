import React, { Component } from 'react'
import TodoHeader from './TodoHeader'
import TodoFooter from "./TodoFooter"
import TodoList from './TodoList'
import TodoModel from "../models/todoModel"
import todoService from '../services/todoService'

class Todos extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    this.todos$ = todoService.todos$
      .subscribe(todos => {
        this.setState({ todos })
      })
  }

  componentWillUnmount() {
    this.todos$.unsubscribe()
  }

  getTodos = () => {
    const { filter } = this.props.match.params
    const { todos } = this.state
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }

  addTodo = (title) => {
    todoService.addTodo$.next(new TodoModel(title))
  }

  removeTodo = (uuid) => {
    todoService.removeTodo$.next(uuid)
  }

  updateTodo = ({ uuid, newTitle }) => {
    todoService.updateTodo$.next({ uuid, newTitle })
  }

  toggleCompleted = (uuid) => {
    todoService.toggleCompleted$.next(uuid)
  }

  toggleAll = (e) => {
    todoService.toggleAll$.next(e.target.checked)
  }

  clearCompleted = () => {
    todoService.clearCompleted$.next()
  }

  render() {
    const { todos } = this.state
    let todoList = null
    let todoFooter = null
    if (todos.length > 0) {
      const restCount = todos.filter(todo => !todo.completed).length
      const hasCompleted = todos.length > restCount

      todoList = (
        <TodoList
          todos={this.getTodos()}
          removeTodo={this.removeTodo}
          updateTodo={this.updateTodo}
          toggleCompleted={this.toggleCompleted}
          toggleAll={this.toggleAll}
        />
      )

      todoFooter = (
        <TodoFooter
          restCount={restCount}
          hasCompleted={hasCompleted}
          clearCompleted={this.clearCompleted}
        />
      )
    }

    return (
      <div className="todoapp">
        <TodoHeader addTodo={(title) => this.addTodo(title)}/>
        {todoList}
        {todoFooter}
      </div>
    )
  }
}

export default Todos
