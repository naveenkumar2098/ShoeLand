import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  url: string = 'http://localhost:3000/paymentsMethods'
  
  constructor(private http: HttpClient) { }

  listAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.url);
  }

  listOne(id: number): Observable<Payment> {
    return this.http.get<Payment>(this.url + '/' + id);
  }
}
