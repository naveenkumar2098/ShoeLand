import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = "http://localhost:3000/products";

  constructor(private http: HttpClient) { }

  listAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  listPagination(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/' + `?_page=${page}&_limit=12`);
  }

  listOne(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + id);
  }
  
  editProductStock(product: Product) {
    return this.http.patch<Product>(this.url + "/" + product.id, { "stock": product.stock });
  }
}