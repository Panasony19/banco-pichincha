import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/crudBank.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudBankService {

  public API_URL: string = environment.url_Public;

  public headers = new HttpHeaders({
    'authorId' : '195',
  });

  constructor(
    private _http: HttpClient,
  ) { }

  getProducts(): Observable<Product[]>{
    return this._http.get<Product[]>(`${this.API_URL}bp/products`, { headers: this.headers });
  }

  createProduct(body: any): Observable<Product>{
    return this._http.post<Product>(`${this.API_URL}bp/products`, body, { headers: this.headers });
  }

  updateProduct(body: any): Observable<Product> {
    return this._http.put<Product>(`${this.API_URL}bp/products`, body, { headers: this.headers });
  }

  deleteProduct(id: any) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this._http.delete(`${this.API_URL}bp/products`, { headers: this.headers, params });
  }

  validateId(id: any) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this._http.get(`${this.API_URL}bp/products/verification`, { headers: this.headers, params});
  }

}
