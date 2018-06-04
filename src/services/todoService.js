import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/publishReplay'
import 'rxjs/add/operator/map'

const initialTodos = JSON.parse(localStorage.getItem('todos') || '[]')

class TodoService {
  constructor() {
    this.update$ = new BehaviorSubject(initialTodos)
    this.addTodo$ = new Subject()
    this.removeTodo$ = new Subject()
    this.updateTodo$ = new Subject()
    this.toggleCompleted$ = new Subject()
    this.toggleAll$ = new Subject()
    this.clearCompleted$ = new Subject()

    this.todos$ = this.update$
      .scan((todos, operation) => operation(todos))
      .publishReplay(1)
      .refCount()

    this.todos$.forEach(todos => localStorage.setItem('todos', JSON.stringify(todos)))

    this.addTodo$
      .map(todo => todos => [...todos, todo])
      .subscribe(this.update$)

    this.removeTodo$
      .map(uuid => todos => todos.filter(todo => todo.id !== uuid))
      .subscribe(this.update$)

    this.updateTodo$
      .map(({ uuid, newTitle }) => todos => {
        const targetTodo = todos.find(todo => todo.id === uuid)
        targetTodo.title = newTitle
        return todos
      })
      .subscribe(this.update$)

    this.toggleCompleted$
      .map(uuid => todos => {
        const targetTodo = todos.find(todo => todo.id === uuid)
        targetTodo.completed = !targetTodo.completed
        return todos
      })
      .subscribe(this.update$)

    this.toggleAll$
      .map(completed => todos => {
        todos.forEach(todo => todo.completed = completed)
        return todos
      })
      .subscribe(this.update$)

    this.clearCompleted$
      .map(() => todos => todos.filter(todo => !todo.completed))
      .subscribe(this.update$)
  }
}

export default new TodoService()