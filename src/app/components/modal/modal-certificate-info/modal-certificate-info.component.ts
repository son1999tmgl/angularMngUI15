import { Component, EventEmitter, Input, Output } from '@angular/core';
import { result } from 'lodash';
import * as moment from 'moment';
import { myFunc } from 'src/app/common/myFunc';
import { AlertService } from 'src/app/common/services/Alert.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
    selector: 'app-modal-certificate-info',
    templateUrl: './modal-certificate-info.component.html',
    styleUrls: ['./modal-certificate-info.component.scss']
})
export class ModalCertificateInfoComponent {
    _display = false


    @Input()
    set id(value: any) {
        if(myFunc.isEmpty(value)) {
            this._display = false
        } 
        else{
            this._display = true
            this.getCertificate(value)
        }
        
    }
    @Output() idChange = new EventEmitter<any>()


    constructor(
        private requestService: RequestService,
        private alertService: AlertService
    ) {

    }

    certificateInfo: any = {}
    subjectDN: any = ''


    actionCloseModal() {
        this._display = false
        this.idChange.emit(false)
    }

    getCertificate(value: any){
        this.requestService.getCertificateInfoBySerialNumber(value).toPromise()
        .then((result: any) => {
            myFunc.readFileCer(result.base64CertSN)
            .then((result: any) => {
                console.log('result: ', result);
                this.certificateInfo = result.certInfo
                this.subjectDN = result.subjectDN
            })
            .catch((err: any) => {
                console.log('err: ', err);
                
            })
        })
        .catch((err: any) => {
            this.alertService.showError('Có lỗi xảy ra trong quá trình lấy chứng thư.')
        })
    }

    subTypeCard(data: any) {
        try {
            var type = data.split(':');
            return type[0];
        } catch (error) {
            return ''
        }
    }

    subValue(data: any) {
        try {
            var mst = data.split(':').pop();
            return mst;
        } catch (error) {

        }
    }
    formatDateTime(dateTime: any) {
        return moment(dateTime).format('DD-MM-YYYY');
    }
}
