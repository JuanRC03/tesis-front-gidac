import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SolicitudEliminarService {

  constructor(private http:HttpClient) { }

  
}
