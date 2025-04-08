import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Rade Todo App';
  todos: Todo[] = [];
  newTodo: string = '';

  ngOnInit() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  addTodo() {
    if (this.newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        title: this.newTodo.trim(),
        completed: false
      };
      this.todos.push(todo);
      this.newTodo = '';
      this.updateLocalStorage();
    }
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateLocalStorage();
  }

  removeTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
