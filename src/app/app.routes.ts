import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeComponent } from './home/home.component';
import { RxjsExamplesComponent } from './rxjs-examples/rxjs-examples.component';
import { SignalsComponent } from './signals/signals.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'todo-list', component: TodoListComponent},
    {path: 'rxjs', component: RxjsExamplesComponent},
    {path: 'signals', component: SignalsComponent, data: { firstName: 'First', lastName: 'Last'} }
];
