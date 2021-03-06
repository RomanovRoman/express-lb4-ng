import {Component, OnInit} from '@angular/core';

import {TodoService} from '../todo.service';
import {Todo} from '../todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService
      .getTodos()
      .subscribe(data => (this.todos = data), error => console.log(error));
  }
}
