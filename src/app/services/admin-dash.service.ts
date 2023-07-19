import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AdminDashService {

  constructor(private http:HttpClient) { }

  public obtenerContadorDatos(){
    return this.http.get(`${baserUrl}/admin/contador-dash`);
  }

}
