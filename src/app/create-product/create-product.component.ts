import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudBankService } from '../services/crud-bank.service';
import { ProductService } from '../services/producto.service';
import { Router } from '@angular/router';
import { Product } from '../interfaces/crudBank.interface';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public formProduct!: FormGroup;
  public validateId: boolean = false;
  public dateToday: any = new Date().toISOString().substring(0, 10);
  public isCreateProduct : boolean = true;
  public product: any;
  public errCreateProduct: boolean = false;
  public errCreateProductMessage: string = '';

  public id = new FormControl({ value: '', disabled: false }, [
		Validators.required,
    Validators.minLength(3),
    Validators.maxLength(10)
	]);

	public name = new FormControl({ value: '', disabled: false }, [
		Validators.required,
		Validators.minLength(5),
    Validators.maxLength(100)
	]);

  public description = new FormControl({ value: '', disabled: false }, [
		Validators.required,
		Validators.minLength(10),
		Validators.maxLength(200),
	]);

  public logo = new FormControl({ value: '', disabled: false }, [
		Validators.required,
	]);

  public date_release = new FormControl({ value: this.dateToday, disabled: false }, [
		Validators.required,
	]);

  public date_revision = new FormControl({ value: this.dateToday, disabled: true }, [
		Validators.required,
	]);

  constructor(
    private _formBuilder: FormBuilder,
    private _crudBankService: CrudBankService,
    private productoService: ProductService,
    private router: Router
  ) {
    this.isCreateProduct = this.productoService.modoEdition;
    this.product = this.isCreateProduct ? null : this.productoService.product
  }

  ngOnInit(): void {
    if(this.isCreateProduct) {
      this.createForm();
    } else {
      this.editForm();
    }
  }

  formDate(date: any) {
    let dateModified = new Date(date).toISOString().substring(0, 10);
    return dateModified
  }

  createForm(): void {
    this.formProduct = this._formBuilder.group({
      id: this.id,
      name: this.name,
      description: this.description,
      logo: this.logo,
      date_release: this.date_release,
      date_revision : this.date_revision
    });
  }

  editForm() {
    this.formProduct = this._formBuilder.group({
      id: new FormControl({ value: this.product.id, disabled: this.isCreateProduct ? false : true }, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)
        ]),
      name: new FormControl({ value: this.product.name, disabled: false }, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]),
      description: new FormControl({ value: this.product.description, disabled: false }, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl({ value: this.product.logo, disabled: false }, [
        Validators.required,
      ]),
      date_release: new FormControl({ value: this.formDate(this.product.date_release), disabled: false }, [
        Validators.required,
      ]),
      date_revision : new FormControl({ value: this.formDate(this.product.date_revision), disabled: true }, [
        Validators.required,
      ])
    });
  }

  submitForm() {
    let dataSend = {
      id: this.formProduct.controls['id'].value,
      name: this.formProduct.controls['name'].value,
      description: this.formProduct.controls['description'].value,
      logo: this.formProduct.controls['logo'].value,
      date_release: this.formProduct.controls['date_release'].value,
      date_revision: this.formProduct.controls['date_revision'].value,
    }
    
    this._crudBankService.createProduct(dataSend).subscribe((product: Product) => {
      this.router.navigate(['/']);
      this.clearForm();
    }, (err: any) => {
      this.errCreateProductMessage = err.error.error
      this.errCreateProduct = true;
      setTimeout(() => {
        this.errCreateProduct = false;
      }, 3000);
    });
  }

  updateForm() {

    let dataSend = {
      id: this.formProduct.controls['id'].value,
      name: this.formProduct.controls['name'].value,
      description: this.formProduct.controls['description'].value,
      logo: this.formProduct.controls['logo'].value,
      date_release: this.formProduct.controls['date_release'].value,
      date_revision: this.formProduct.controls['date_revision'].value,
    }
    
    this._crudBankService.updateProduct(dataSend).subscribe((product: Product) => {
      this.clearForm();
      this.router.navigate(['/']);
    }, (err: any) => {
      this.errCreateProductMessage = err.error.error
      this.errCreateProduct = true;
      setTimeout(() => {
        this.errCreateProduct = false;
      }, 3000);
    });
  }

  clearForm() {
    this.formProduct.reset();
  }

  verificationId() {
    if(this.formProduct.controls['id'].value.length > 2) {
      this._crudBankService.validateId(this.formProduct.controls['id'].value).subscribe((res :any) => {
        this.validateId = res;

      }, (error: any) => {

      })
    }
  }

  onDateReleaseChange() {
    const dateReleaseValue = this.formProduct.get('date_release')?.value;
    if (dateReleaseValue) {
      const dateRevision = new Date(dateReleaseValue);
      dateRevision.setFullYear(dateRevision.getFullYear() + 1);
      this.formProduct.get('date_revision')?.setValue(dateRevision.toISOString().substring(0, 10));
    } 
  }
}
