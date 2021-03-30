import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  public productos: any = [];
  cantidad:number=0;
  loaderSetVisible:boolean;
searchForm: FormGroup;
error:string='';
  constructor(private productosService: ProductosService, private orderService: OrdersService, 
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchInp: new FormControl(null, [Validators.required])
          }) ;
          this.cargarProductos();
  
  }

  comprar(producto: string, precio: number){
    this.orderService.addItem({producto: producto, precio: precio, cantidad: 1})
  }
 cargarProductos(){
  this.loaderSetVisible = true
    
  this.productosService.getProductos().subscribe(
    
    (prod)=> {
        this.productos = prod;
        this.loaderSetVisible = false;
      }
    )
 }
  search(){
    this.router.navigate(['productos'],{queryParams: {producto: this.searchForm.get('searchInp').value}})
    if(!this.searchForm.valid){
      this.cargarProductos();
      this.error = 'Ingrese nombre de producto';
      setTimeout(()=> this.error = null, 3000);
      return;
    }

    this.loaderSetVisible=true;
    this.productosService.getProductosByNombre(this.searchForm.get('searchInp').value).subscribe(
      (prod)=>{
        if(!prod.length){
          this.error=`'${this.searchForm.get('searchInp').value}' no encontrado`
          setTimeout(()=> this.error = null, 3000);
          this.loaderSetVisible=false;
          this.cargarProductos();
          return;
        }
        this.productos = prod;
        this.loaderSetVisible=false;
      }
    )
  }
}
