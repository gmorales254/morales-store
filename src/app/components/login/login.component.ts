import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public logueado: boolean = false;
  error:string="";
  loginForm: FormGroup;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
      userPass: new FormControl(null, [Validators.required, Validators.minLength(6)])
          }) ;
  }

  handleError(error:string){
    this.error = error;
    
    setTimeout(() => this.error = null, 6000);
  }


  login() {
  const {userName, userPass} = this.loginForm.value;

  const obs: Observer<any> = {
    next: null,
    error: (error) => this.handleError(error),
    complete: null
  }

if(!this.loginForm.valid){
  this.loginForm.markAllAsTouched();
  return;
}

this.loginService.postLogin(userName, userPass).subscribe(obs);

  }


}

