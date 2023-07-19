import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DirectorAreaInvestigacionService {

  constructor(private http:HttpClient) { }

}