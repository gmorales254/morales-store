import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private af: AngularFirestore, private lgService: LoginService) { }

  getOrders(){
    return this.af.collection('ordenes', (ref) => ref.where('usuario', '==' , this.lgService.usuario)).valueChanges();
  }

}
