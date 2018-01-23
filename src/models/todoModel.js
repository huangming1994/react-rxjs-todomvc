import { v4 } from 'uuid'

export default class TodoModel {
  constructor(title) {
    this.id = v4()
    this.title = title
    this.completed = false
  }
}