import { Component } from '@angular/core';
import { FileUploaderServiceService } from './file-uploader-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fileObj: File;
  fileUrl: string;
  errorMsg: boolean
  constructor(private fileUploadService: FileUploaderServiceService) {
    this.errorMsg = false
  }

  onFilePicked(event: Event): void {
    this.errorMsg = false
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
  }


  onFileUpload() {
    if (!this.fileObj) {
      this.errorMsg = true
      return
    }
    this.fileUploadService.getpresignedurls(this.fileObj.name, this.fileObj.type).subscribe(res => {
      if (res.success) {
        const fileuploadurl = res.urls[0];
        const imageForm = new FormData();
        imageForm.append('file', this.fileObj);
        this.fileUploadService.uploadfileAWSS3(fileuploadurl, this.fileObj.type, this.fileObj).subscribe((event) => {

        });
      }



    });
  }

}
