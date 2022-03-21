import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-oAuth',
  templateUrl: './oAuth.component.html',
  styleUrls: ['./oAuth.component.css']
})
export class OAuthComponent implements OnInit {
  title = 'OAuth';
  loginForm: FormGroup | undefined;
  socialUser!: SocialUser;
  isLoggedin: boolean = false; 
  constructor(private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService) { }

  ngOnInit() {
    // init the react form object
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });  

    this.socialAuthService.authState.subscribe((user:any) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

}
