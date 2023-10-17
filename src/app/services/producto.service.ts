import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product: any; // Almacena la información del producto
  modoEdition = true; // Bandera para indicar si estás en modo de edición

  constructor() {}

  setProducto(producto: any, modoEdition: boolean) {
    this.product = producto;
    this.modoEdition = modoEdition;
  }
}
