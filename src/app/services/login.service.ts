import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {catchError, tap } from 'rxjs/operators';
import { API_KEY, URL_LOGIN } from 'src/environments/environment';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { URL_REGISTRATION } from 'src/environments/environment.prod';



interface AuthResponseData{
  localId: string;
  idToken: string;
  email: string;
  password: string;
  returnSecureToken: boolean;
  expiresIn: number;
  }

  enum ERROR_TYPE{
    EMAIL_EXISTS = 'EMAIL_EXISTS',
    EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    USER_DISABLED = 'USER_DISABLED' 
  }
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario:string="";
  user$ = new BehaviorSubject<User | null>(null);
  idToken: string = "";


  constructor( private http: HttpClient, private router: Router) { }

  
  postLogin(email: string, password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(URL_LOGIN+API_KEY,{
email,
password,
returnSecureToken: true,
    }).pipe(
      catchError((error)=>this.manejarError(error)),
      tap((resp) =>{
        this.usuario = resp.email;
        this.manejarUsuario(resp);
      } )
    );
  }

  manejarUsuario(resp: AuthResponseData){
    const expiracion = new Date(new Date().getTime() + Number(resp.expiresIn));
    const user = new User(resp.email, resp.localId, resp.idToken, expiracion);
    this.user$.next(user);
    this.router.navigate(['/home']);
  }

  logOut(){
    this.router.navigate(['login']);
    this.user$.next(null);
  }
  
  postRegistrer(email: string, password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(URL_REGISTRATION+API_KEY,{
email,
password,
returnSecureToken: true,
    }).pipe(
      catchError(this.manejarError),
      tap(resp => {
        this.manejarUsuario(resp);
      })
    );
  }
  
  manejarError(resp: any){
    
    let error = 'Se produjo un error';
    console.log('error', resp);
    if(!resp.error || !resp.error.error){
      return throwError(error);
    }

    switch(resp.error.error.message){

       case ERROR_TYPE.EMAIL_EXISTS:
        error = 'El email ya existe';
        break;

        case ERROR_TYPE.INVALID_PASSWORD:
          error = 'Contraseña inválida';
          break;

          case ERROR_TYPE.EMAIL_NOT_FOUND:
            error = 'Usuario no encontrado';
            break;

            case ERROR_TYPE.USER_DISABLED:
              error = 'Usuario deshabilitado';
              break;
    }

    return throwError(error);
  }

}

