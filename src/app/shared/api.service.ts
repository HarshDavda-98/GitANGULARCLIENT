import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }

      // for getting signup 
  postData(data:any){
    return this.http.post<any>("http://localhost:1922/signup",data, {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'MyClientCert': '',        // This is empty
            'MyToken': ''              // This is empty
          }
        )
    }).pipe(map((res:any)=>{
      return res;
    }));
  } 

      // for getting loggin 
  postDataLogin(data:any){
    return this.http.post<any>("http://localhost:1922/signup/login",data, {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'MyClientCert': '',        // This is empty
            'MyToken': ''              // This is empty
          }
        )
    }).pipe(map((res:any)=>{
      return res;
    }))
  } 
  // for entering Data through form 
  postCrudData(data:any){
    return this.http.post<any>("http://localhost:1922/signup/CrudDetails",data, {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'MyClientCert': '',        // This is empty
            'MyToken': ''              // This is empty
          }
        )
    }).pipe(map((res:any)=>{
      return res;
    }));
  } 

  // for getting crud data for list
  GetCrudDetails(){
    return this.http.get<any>("http://localhost:1922/signup/CrudDetails",{
      headers:
      new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'MyClientCert': '',        // This is empty
          'MyToken': ''              // This is empty
        }
      )
    }).pipe(map((res:any)=>{
      return res;
    }));
  }


}
