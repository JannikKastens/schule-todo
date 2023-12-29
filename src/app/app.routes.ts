import { Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {FormComponent} from "./form/form.component";
import {SettingsComponent} from "./settings/settings.component";

export const routes: Routes = [
  { path: 'liste', component: ListComponent },
  { path: 'neues-todo', component: FormComponent},
  { path: 'einstellungen', component: SettingsComponent}
];
