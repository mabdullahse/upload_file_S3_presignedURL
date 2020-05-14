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
    console.log(event);
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
    console.log(this.fileObj);
  }
  onFileUpload() {
    if (!this.fileObj) {
      this.errorMsg = true
      return
    }
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    this.fileUploadService.fileUpload(fileForm).subscribe(res => {
      this.fileUrl = res['image'];
    });
  }

}
