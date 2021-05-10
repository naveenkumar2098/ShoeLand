import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../interfaces/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  url: string = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url);
  }

  insertMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.url, message);
  }
}
