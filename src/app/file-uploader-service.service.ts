import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderServiceService {

  constructor(private http: HttpClient) { }

  
  getpresignedurls(logNamespace, fileType) {
    let getheaders = new HttpHeaders().set('Accept', 'application/json');
    let params = new HttpParams().set('fileName', logNamespace).set('fileType', fileType);
    return this.http.get<any>('http://localhost:5000/generatepresignedurl', { params: params, headers: getheaders });
  }

  uploadfileAWSS3(fileuploadurl, contenttype, file) { 
 
    const headers = new HttpHeaders({ 'Content-Type': contenttype });
    const req = new HttpRequest(
      'PUT',
      fileuploadurl,
      file,
      {
        headers: headers, 
      });
    return this.http.request(req);
  }
}
