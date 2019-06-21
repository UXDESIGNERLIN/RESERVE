import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from  '@angular/forms';
import { LogoutComponent } from './pages/logout/logout.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { NavigationComponent } from './pages/main/navigation.component';
import { TopnavbarComponent } from './pages/main/topnavbar.component';
import { CourseslistComponent } from './pages/courseslist/courseslist.component';
import { CreatecourseComponent } from './pages/createcourse/createcourse.component';
import { ClasseslistComponent } from './pages/classeslist/classeslist.component';
import { CreateclassComponent } from './pages/createclass/createclass.component';
import { SelectcourseComponent } from './components/selectcourse/selectcourse.component';
import { DateComponent } from './components/date/date.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { CompanyComponent } from './pages/company/company.component';
import { ClassReservationsComponent } from './pages/class-reservations/class-reservations.component';
import { SupportComponent } from './pages/support/support.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ContactUsersComponent } from './pages/contact-users/contact-users.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { WYSIWYGComponent } from './components/wysiwyg/wysiwyg.component';
import { SelectCourseTypeComponent } from './components/select-course-type/select-course-type.component';
import { SnippetComponent } from './pages/snippet/snippet.component';
import { ReqIconPipe } from './pipe/req-icon.pipe';
import { EditConfirmationStatusComponent } from './components/edit-confirmation-status/edit-confirmation-status.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LogoutComponent,
    LoginComponent,
    MainComponent,
    NavigationComponent,
    TopnavbarComponent,
    CourseslistComponent,
    CreatecourseComponent,
    ClasseslistComponent,
    CreateclassComponent,
    SelectcourseComponent,
    DateComponent,
    EmailVerificationComponent,
    CompanyComponent,
    ClassReservationsComponent,
    SupportComponent,
    StatisticsComponent,
    ContactUsersComponent,
    DatatableComponent,
    WYSIWYGComponent,
    SelectCourseTypeComponent,
    SnippetComponent,
    ReqIconPipe,
    EditConfirmationStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
