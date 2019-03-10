import {Component, OnInit} from '@angular/core';

import {Todos3GQL, Todos3} from '../graphql';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Observable<Todos3.Query>;

  constructor(private todos3GQL: Todos3GQL) {}

  ngOnInit() {
    this.todos = this.todos3GQL
      .watch()
      .valueChanges.pipe(map(todos => todos.data));
  }
}
