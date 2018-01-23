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

  addTodo = (title) => {
    todoService.addTodo$.next(new TodoModel(title))
  }

  removeTodo = (uuid) => {
    todoService.removeTodo$.next(uuid)
  }

  render() {
    return (
      <div className="todoapp">
        <TodoHeader addTodo={(title) => this.addTodo(title)}/>
        <TodoList
          todos={this.state.todos}
          removeTodo={this.removeTodo}
        />
        <TodoFooter />
      </div>
    )
  }
}

export default Todos
