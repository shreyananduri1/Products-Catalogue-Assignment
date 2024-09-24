import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import constants from '../constants'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productUrl = constants.PRODUCT_URL;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.productUrl);
  }

  addProduct(payload:any) {
    return this.http.post(`${this.productUrl}/create`, payload);
  }

  editProduct(id:any, product: any): Observable<any> {
    return this.http.put(`${this.productUrl}/${id}`, product);
  }

  getProductById(id:any): Observable<any> {
    return this.http.get(`${this.productUrl}/${id}`);
  }

  deleteProductById(id:any){
    return this.http.delete(`${this.productUrl}/${id}`);
  }
}
