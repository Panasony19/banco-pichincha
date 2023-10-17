import { Component, OnInit } from '@angular/core';
import { CrudBankService } from '../services/crud-bank.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/producto.service';
import { Product } from '../interfaces/crudBank.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public productsAll: any = [];
  public products: Product[] = [];
  public searchText: string = '';
  public productAction: any;
  public errCreateProduct: boolean = false;
  public errCreateProductMessage: string = '';

  // Paginación
  public registerByPage = 5;
  public currentPage = 1;

  constructor(
    private _crudBankService: CrudBankService,
    private productoService: ProductService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  updateProductsPaid() {
    const inicio = (this.currentPage - 1) * this.registerByPage;
    const fin = inicio + this.registerByPage;
    this.products = this.productsAll.slice(inicio, fin);
  }

  changeRecordsByPage() {
    this.currentPage = 1;
    this.updateProductsPaid();
  }

  pagePrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateProductsPaid();
    }
  }

  pageNext() {
    if (this.products.length >= this.registerByPage) {
      this.currentPage++;
      this.updateProductsPaid();
    }
  }
  
  getAllProducts() {
    this._crudBankService.getProducts().subscribe((res: any) => {
      this.productsAll = res;
      this.products = res;
      this.updateProductsPaid();
    });
  }

  crateOrEditProduct(status: boolean, product?: any) {
    if (status) {
      this.productoService.setProducto(product, true);
      this.router.navigate(['/create-product']);
    } else {
      this.productoService.setProducto(product, false);
      this.router.navigate(['/update-product']);
    }
  }

  searchProducts() {
    this.products = this.productsAll.filter((product: any) =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
  confirmAction() {
    this._crudBankService.deleteProduct(this.productAction.id).subscribe((res:any) => {
      this.getAllProducts();
      this.closeModal();
    }, (err:any) => {
      console.log(err);
      
      this.errCreateProductMessage = err.error
      this.errCreateProduct = true;
      this.closeModal();
      setTimeout(() => {
        this.errCreateProduct = false;
      }, 3000);
    })
  }

  openModal(productAction: any) {
    this.productAction = productAction;
    const modal = document.getElementById('myModal')!;
    modal.style.display = 'block';
  }

  closeModal() {
    const modal = document.getElementById('myModal')!;
    modal.style.display = 'none';
  }
}
