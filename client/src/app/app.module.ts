import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodosComponent} from './todos/todos.component';

import {ApiModule} from './generated/api.module';

@NgModule({
  declarations: [AppComponent, TodosComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ApiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
