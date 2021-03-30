
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';

interface Producto{
  producto: string;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orden:Producto[]=[]
  ordenes$ = new BehaviorSubject<any | null>(null);

  constructor(private af: AngularFirestore, private log: LoginService) { 
    this.ordenes$.next(this.orden);
  }

  addItem(item){
    if(item){

      let res = this.orden.indexOf(this.orden.find( elemento => elemento.producto === item.producto));

      if(res < 0){
      item ? this.orden.push(item) : null;
      }else{
      this.orden[res].cantidad += item.cantidad; 
      this.orden[res].precio += item.precio;
      }
      
    this.ordenes$.next(this.orden);
    }

  
  }

  postOrder(){
    let total = 0;
    this.orden.map((item)=> total += item.precio);

    return this.af.collection('ordenes').add({
      usuario: this.log.usuario,
      orden: this.orden,
      fecha: new Date(),
      total: total
    }).then((resp)=>{
      this.orden = [];
      this.ordenes$.next(this.orden);
      alert('compra realizada con exito')
    }).catch((error)=>{
      console.log('Error: ',error);
    })

  }
  
}
