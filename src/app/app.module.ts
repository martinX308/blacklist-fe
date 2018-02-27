import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// -- components
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

// -- guards
import { RequireAnonGuardService } from './guards/require-anon-guard.service';
import { RequireUserGuardService } from './guards/require-user-guard.service';
import { InitAuthGuardService } from './guards/init-auth-guard.service';

// -- pages
import { HomepageComponent } from './pages/homepage/homepage.component';

// routes
const routes: Routes = [
  { path: '',  component: HomepageComponent, canActivate: [ InitAuthGuardService ] },
 // { path: 'login',  component: AuthLoginPageComponent, canActivate: [ RequireAnonGuardService ] },
 // { path: 'signup',  component: AuthSignupPageComponent, canActivate: [ RequireAnonGuardService ] },
 // { path: 'page',  component: ... , canActivate: [ RequireUserGuardService ] },
 // { path: '**', redirectTo: '' }
];

// don't forget to register the guards (and the AuthService) in the providers

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
