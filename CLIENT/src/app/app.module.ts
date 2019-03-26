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
    SelectcourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
