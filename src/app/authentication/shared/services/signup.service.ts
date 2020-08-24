import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


interface SignupData {
  firstName: string;
  lastName: string,
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  signup(data: any): Observable<any>{
    const signupData: SignupData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.username,
      password: data.password
    };

    return this.httpClient.post(environment.apiUrl + 'users/signup', signupData);
  }
}
