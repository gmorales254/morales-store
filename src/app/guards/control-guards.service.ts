import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ControlGuardsService implements CanActivate{
  constructor(private loginService: LoginService,
    private router: Router){}
canActivate():boolean | Observable<boolean> | Promise<boolean | UrlTree>{

return this.loginService.user$.pipe(
  map(user =>{
    const autenticado = !!user;

    if(autenticado){
      return true;
    }else{
      
    this.router.navigate(['login']);
      return false;
    }
  })
)

// return this.loginService.estaLogeado().then((estadoLogeado: boolean) => {
//   if(estadoLogeado){
//    return true;
//   }else{     
//     this.router.navigate(['login'], 
//     { queryParams: {logued: false} 
//   })
//     return false;
//    }
// })
}
}
