import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  get(url) {

    // const token = this.authService.getToken();
    const token = 'token';

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': token
    });
    return this.httpClient.get(url, {headers});
  }

  post(url: string, data: any){
      
    // const token = this.authService.getToken();
    const token = 'token';
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': token
    });

    return this.httpClient.post(url, data, {headers} );
  }

  postImages(url: string, data: any, id: string){
    const uploadData = new FormData();
    console.log(data);
    // for (let i = 0 ; i < data.length ; i++)
    // {
    //   console.log(data[i]);
    //   uploadData.append('file' + i.toString(), data[i]);
    // }
    uploadData.append('file', data);
    uploadData.append('productId', id);
    // data.forEach(item => {
    console.log(uploadData);
    // });
    // const token = this.authService.getToken();
    const token = 'token';
    // const headers = new HttpHeaders({
    //   "content-type": "multipart/form-data"
    // });
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.httpClient.post(url, uploadData, {headers});
  }

  put(url: string, data: any){
    // const token = this.authService.getToken();
    const token = 'token';
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': token
    });

    return this.httpClient.post(url, data, {headers} );
  }

  delete(url: string) {
    // const token = this.authService.getToken();
    const token = 'token';
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': token
    });
    return this.httpClient.delete(url, {headers});
  }
}
