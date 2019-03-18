import {Component, OnInit} from '@angular/core';

import {TodosGQL, Todos} from '../graphql';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Observable<Todos.Query>;

  constructor(private todosGQL: TodosGQL) {}

  ngOnInit() {
    this.todos = this.todosGQL
      .watch()
      .valueChanges.pipe(map(todos => todos.data));
  }
}
