import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  
  registerForm: FormGroup;
  error: string;

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
      userPass: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      userRePass: new FormControl(null, [Validators.required, Validators.minLength(6)])
          },{
            validator: ConfirmPasswordValidator("userPass", "userRePass")
          }) ;
  }

  
  registrar(){
    const {userName, userPass} = this.registerForm.value;
    const obs: Observer<any> = {
      next: () => null,
      error: (error) => this.handleError(error),
      complete: () => console.log('completado')
    }

      this.loginService.postRegistrer(userName, userPass).subscribe(obs);
            
  }


  handleError(error: any): void {
    this.error = error ? error : 'Se produjo un error';
    
    setTimeout(() => this.error = null, 6000);
  }
}
