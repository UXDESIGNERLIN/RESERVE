import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from 'src/app/pages/signup/signup.component';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { MainComponent } from 'src/app/pages/main/main.component';
import { CourseslistComponent } from './pages/courseslist/courseslist/courseslist.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'main', component: MainComponent ,
    children: [
      { path: '', redirectTo: 'courseslist', pathMatch: 'full' },
      { path: 'courseslist', component: CourseslistComponent }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
