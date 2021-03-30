import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 loginAndOut:string="Login"
 @Input() logueado:any=false;
 cantidad:number=0;
 estadoLog: boolean=false;

  constructor(private loginService : LoginService,
    private router: Router, private carrito: OrdersService) { }

  ngOnInit(): void {
   this.loginService.user$.subscribe((user)=>{
     this.estadoLog = !!user;
   })

   this.carrito.ordenes$.subscribe((value)=>{
     this.cantidad = 0;
    if(value.length){
      value.map((item)=>{this.cantidad += item.cantidad});
    }else{
      this.cantidad = 0;
    }
   }
   )

  }

  Login(){
    this.router.navigate(['login']);
  }

  Logout(){
    this.loginService.logOut();
  }


}
