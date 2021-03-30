import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private af: AngularFirestore) { }

  getProductos(){
    return this.af.collection('productos', (ref) => ref.orderBy('precio', 'asc')).valueChanges();
  }
  getProductosByNombre(nombre:string){
    return this.af.collection('productos', (ref) => ref.where('titulo', '==', nombre)).valueChanges();
  }
}
