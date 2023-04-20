import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpHeadersService {
  public headers: HttpHeaders = new HttpHeaders();

  constructor() {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.setAuthorization()
  }


  setAuthorization() {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      this.headers = this.headers.set('Authorization', `Bearer ${accessToken}`);
    } else {
      this.headers = this.headers.delete('Authorization');
    }
  }


}

