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
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ClassReservationsComponent } from './pages/class-reservations/class-reservations.component';
import { CompanyComponent } from './pages/company/company.component';
import { SupportComponent } from './pages/support/support.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ContactUsersComponent } from './pages/contact-users/contact-users.component';
import { EmailTemplateComponent } from './pages/email-template/email-template.component';
import { SnippetComponent } from './pages/snippet/snippet.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'verify', component: EmailVerificationComponent },
  { path: 'verify/:email', component: EmailVerificationComponent },
  { path: 'verify/:email/:code', component: EmailVerificationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'emailVerification', component: EmailVerificationComponent },
  { path: 'main', component: MainComponent ,
    canActivate:[AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'courseslist', pathMatch: 'full' },
      { path: 'createcourse', component: CreatecourseComponent},
      { path: 'createcourse/:id', component: CreatecourseComponent},
      { path: 'courseslist', component: CourseslistComponent },
      //{ path: 'courseslist/:id', component: ClasseslistComponent }, // set up an URL: main/course/{course.id} to get all classes from a certain course but in classeslist page
      { path: 'classeslist', component: ClasseslistComponent },
      { path: 'classeslist/:id', component: ClasseslistComponent },
      { path: 'createclass/:courseid', component: CreateclassComponent },
      { path: 'createclass/:courseid/:classid', component: CreateclassComponent }, // When updating
      { path: 'company', component: CompanyComponent },
      { path: 'classReservations/:id', component: ClassReservationsComponent },
      { path: 'support', component: SupportComponent },
      { path: 'statistics/:by', component: StatisticsComponent },
      { path: 'statistics/:by/:id', component: StatisticsComponent },
      { path: 'statistics', redirectTo: 'statistics/company' },
      { path: 'contactUsers/:by', component: ContactUsersComponent },
      { path: 'contactUsers/:by/:id', component: ContactUsersComponent },
      { path: 'contactUsers', redirectTo: 'contactUsers/company' },
      { path: 'emailTemplate', component: EmailTemplateComponent },
      { path: 'snippet', component: SnippetComponent },
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
