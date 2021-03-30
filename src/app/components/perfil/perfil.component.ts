import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

interface Orden{
  total: number;
  fecha: Date | string | any;
  usuario: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {

  ordenes:Orden[]=[];
  usuario:string="";

  constructor(private profileService: ProfileService, private loginService: LoginService) { }

  ngOnInit(): void {


    this.profileService.getOrders().subscribe((value:Orden[])=>{
      console.log(value)
      this.ordenes = value;
    })

    this.loginService.user$.subscribe((user)=>{
      this.usuario = user.email ? user.email : null;
    })

  }


  
}
