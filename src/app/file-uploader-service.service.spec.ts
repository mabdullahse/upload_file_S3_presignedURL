import { TestBed } from '@angular/core/testing';

import { FileUploaderServiceService } from './file-uploader-service.service';

describe('FileUploaderServiceService', () => {
  let service: FileUploaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
