import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  feedbackEnabled = false;
  error = null;
  processing = false;
  // ... model (e,g. username: String)
  username: String;
  password: String;
  loginDetails:{};
  

  constructor( private authService: AuthService,private router:Router) {}

  ngOnInit() { };

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    this.loginDetails={
      username: this.username,
      password: this.username
      };
    if (form.valid) {
      this.processing = true;
      this.authService.login(this.loginDetails)
        .then((result) => {
          console.log(result);
          this.router.navigate(['/']);
          this.processing = false;
          // ... handle result, reset form, etc...
          // ... navigate with this.router.navigate(['...'])
          // ... maybe turn this to false if your're staying on the page - this.processing = false;
        })
        .catch((err) => {
          this.error = err.error.error; 
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }
}






