import { Component, EventEmitter, Input, Output } from '@angular/core';
import { myFunc } from 'src/app/common/myFunc';
import { AlertService } from 'src/app/common/services/Alert.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-modal-certificate-puk',
    templateUrl: './modal-certificate-puk.component.html',
    styleUrls: ['./modal-certificate-puk.component.scss']
})
export class ModalCertificatePukComponent {
    _display:any = false
    _puk:any = ''
    _seriNo = ''
    enableChange = false

    constructor(
        private customerService: CustomerService,
        private alertService: AlertService
    ){}

    @Input()
    set puk(value: any) {
        console.log('puk: ', value);
        this._puk = value
    }

    @Input()
    set id(value: any) {
        if (myFunc.isEmpty(value)) {
            this._display = false
        }
        else {
            this._display = true
            this._seriNo = value
        }

    }
    @Output() idChange = new EventEmitter<any>()

    actionCloseModal() {
        this._display = false
        this.idChange.emit(false)
    }

    updatePUK() {
        this.customerService.updatePUK(this._seriNo, this._puk).toPromise()
        .then((result:any) => {
            this.alertService.showSuccess('Cập nhật thành công.')
            this.actionCloseModal()
        })
        .catch((err: any)=> {
            this.alertService.showError('Cập nhật thất bại.')
        })
    }
}
