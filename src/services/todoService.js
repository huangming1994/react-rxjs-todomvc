import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/publishReplay'
import 'rxjs/add/operator/map'

class TodoService {
  constructor() {
    this.update$ = new BehaviorSubject(todos => todos)
    this.addTodo$ = new Subject()
    this.removeTodo$ = new Subject()

    this.todos$ = this.update$
      .scan((todos, operation) => operation(todos), [])
      .publishReplay(1)
      .refCount()

    this.addTodo$
      .map(todo => todos => [...todos, todo])
      .subscribe(this.update$)

    this.removeTodo$
      .map(uuid => todos => todos.filter(todo => todo.id !== uuid))
      .subscribe(this.update$)
  }
}

export default new TodoService()