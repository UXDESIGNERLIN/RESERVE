import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from 'src/app/pages/signup/signup.component';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { MainComponent } from 'src/app/pages/main/main.component';
import { CreatecourseComponent } from './pages/createcourse/createcourse.component';
import { CourseslistComponent } from './pages/courseslist/courseslist.component';
import { ClasseslistComponent } from './pages/classeslist/classeslist.component';
import { CreateclassComponent } from './pages/createclass/createclass.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'main', component: MainComponent ,
    children: [
      { path: '', redirectTo: 'courseslist', pathMatch: 'full' },
      { path: 'createcourse', component: CreatecourseComponent},
      { path: 'createcourse/:id', component: CreatecourseComponent},
      { path: 'courseslist', component: CourseslistComponent },
      { path: 'classeslist', component: ClasseslistComponent },
      { path: 'createclass', component: CreateclassComponent }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
