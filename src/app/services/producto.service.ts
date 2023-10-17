import { Injectable } from '@angular/core';
import { Product } from '../interfaces/crudBank.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product!: Product; // Almacena la información del producto
  modoEdition = true; // Bandera para indicar si estás en modo de edición

  constructor() {}

  setProducto(product: Product, modoEdition: boolean) {
    this.product = product;
    this.modoEdition = modoEdition;
  }
}
