import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../../shared/animation';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-contracts',
  templateUrl: './upload-contracts.component.html',
  styleUrls: ['./upload-contracts.component.scss'],
  animations: [ slideInAnimation ]
})
export class UploadContractsComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  form: FormGroup;
  pathInput: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('files', this.fileData);
    this.fileUploadProgress = '0%';

    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          console.log(events.body);
        }
      });
  }

  initForm() {
    this.form = new FormGroup({
      uploader: new FormControl(null, [Validators.required]),
    });
  }

  removeContract() {
    this.fileData = null;
    this.pathInput = '';
    this.fileUploadProgress = '0';
  }
}
