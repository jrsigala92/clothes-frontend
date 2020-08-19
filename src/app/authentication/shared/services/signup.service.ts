import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


interface SignupData {
  name:string;
  email:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient:HttpClient) { }

  signup(data:any):Observable<any>{
    const signupData:SignupData = {
      name: data.name,
      email: data.username,
      password: data.password
    };

    return this.httpClient.post(environment.apiUrl+'signup', signupData);
  }
}
