import {Component, OnInit} from '@angular/core';
import {TodoControllerService} from './../generated/api/api';

import {Todo} from './../generated/model/models';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoControllerService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService
      .todosGet()
      .subscribe(data => (this.todos = data), error => console.log(error));
  }
}
