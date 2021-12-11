import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/tasks.module').then(
        (m) => m.TasksModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
