import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// -- components
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

// -- guards and services
import { RequireAnonGuardService } from './guards/require-anon-guard.service';
import { RequireUserGuardService } from './guards/require-user-guard.service';
import { InitAuthGuardService } from './guards/init-auth-guard.service';
import { AuthService } from './services/auth.service';


// -- pages
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { MyViewComponent } from './pages/my-view/my-view.component';

// routes
const routes: Routes = [
  { path: '',  component: HomepageComponent, canActivate: [ InitAuthGuardService, RequireAnonGuardService] },
  { path: 'signup',  component:SignupPageComponent , canActivate: [ RequireAnonGuardService ] },
  { path: 'my-view',  component: MyViewComponent , canActivate: [ RequireUserGuardService ] },
  { path: '**', redirectTo: '' }
];

// don't forget to register the guards (and the AuthService) in the providers

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupPageComponent,
    SignupComponent,
    LoginComponent,
    MyViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RequireAnonGuardService, RequireUserGuardService, InitAuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
