import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { myFunc } from '../../myFunc';

@Component({
    selector: 'app-my-image',
    templateUrl: './my-image.component.html',
    styleUrls: ['./my-image.component.scss']
})
export class MyImageComponent {

    private _fileInput: any;
    // public _listFiles: { url: any, type: string, available: boolean, deleteFile: boolean }[] = [];
    public _listFiles: any = [];
    previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
    // public fileCurrent: { url: any, type: string, available: boolean, deleteFile: boolean } = { url: '', type: '', available: false, deleteFile: true }
    public fileCurrent: any = { url: '', type: '', available: false, deleteFile: true }
    public pdfSrc = "";
    public imageSrc: any = "";


    constructor(
        private sanitizer: DomSanitizer,
    ) { }

    // danh sách file xuất ra ngoài để cập nhật, update...
    @Output() listFiles = new EventEmitter<any>();

    // file đầu vào khi chọn
    @Input()
    set fileInput(value: any) {  
        if (!myFunc.isEmpty(value)) {            
            this._fileInput = value;
            let file = this._fileInput.target.files[0];
            if (file.type === 'application/pdf') {
                this._listFiles.push({
                    type: 'pdf',
                    url: URL.createObjectURL(file),
                    available: false,
                    deleteFile: true,
                    name: file.name

                })
                this.listFiles.emit(this._listFiles);
            } else if (file.type.startsWith('image/')) {
                this._listFiles.push({
                    type: 'img',
                    url: this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file)),
                    available: false,
                    deleteFile: true,
                    name: file.name
                });
                this.listFiles.emit(this._listFiles);
            }
            this.fileCurrent = this._listFiles[this._listFiles.length-1]
        }
    }

    // 
    @Input() deleteFile: boolean = true

    public _listFileInput: any

    // mảng file đầu vào(khi xem chi tiết)
    @Input()
    set listFileInput(value: any) {        
        if(value.length > 0) {
            this._listFileInput = [...value]
            this._listFiles = [...value]
            this.fileCurrent = this._listFiles[0]
        }

    }


    changeFileCurrent(index: number){
        this.fileCurrent = this._listFiles[index]
    }

    removeFile(index: number){
        this._listFiles.splice(index, 1)
        if(this._listFiles.length > 0) {
            this.fileCurrent = this._listFiles[this._listFiles.length-1]
        }else{
            this.fileCurrent = { url: '', type: '', available: false, deleteFile: true }
        }
    }

}
