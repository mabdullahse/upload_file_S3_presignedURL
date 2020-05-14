import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderServiceService {

  constructor(private http: HttpClient) { }

  fileUpload(file: FormData) {
    return this.http.post('http://localhost:5000/api/upload', file);
  }

}
