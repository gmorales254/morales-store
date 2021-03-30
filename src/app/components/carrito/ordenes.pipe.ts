import { Pipe, PipeTransform } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Pipe({
  name: 'ordenesPipe',
  pure: false
})
export class OrdenesPipe implements PipeTransform {

  constructor(private ord: OrdersService){}
  transform(value: unknown, ...args: unknown[]): any {
    if (this.ord.orden.length === 0) return [{producto: 'No hay productos en la lista'}];
    else return this.ord.orden;
  }

}
