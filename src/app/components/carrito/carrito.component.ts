import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  ordenes:Array<string|number>=[];
  total:number=0;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.ordenes$.subscribe((value)=>{
      this.ordenes = value;
      value.map((item)=>{this.total+=item.precio});
    });

  }

  comprar(){
    this.ordersService.postOrder();
  }


}
