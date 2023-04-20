import { Component, EventEmitter, Input, Output } from '@angular/core';
import { param } from 'jquery';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { myFunc } from 'src/app/common/myFunc';
import { AlertService } from 'src/app/common/services/Alert.service';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
    selector: 'app-create-certificate-profile',
    templateUrl: './create-certificate-profile.component.html',
    styleUrls: ['./create-certificate-profile.component.scss']
})
export class CreateCertificateProfileComponent {

    _agencyId: string | number = ''
    // kiểm tra xem là thêm mới hay chỉnh sửa
    check = false
    @Input() display: boolean = false
    @Input() 
    set agencyId(id: string | number){
        if(!myFunc.isEmpty(id)){            
            this._agencyId = id
            this._certificate = {}
            this._certificate.agencyId = id
        }
    }
    @Input()
    set certificate(value: any){        
        if(myFunc.isEmpty(value)){
            this._certificate = {}
            this.title = 'Thêm mới certificate profile'
            this.check = false
        }else{
            this._certificate = value
            this.title = 'Cập nhật certificate profile'
            this.check = true
        }
    }
    @Output() displayChange = new EventEmitter<boolean>()


    constructor(
        private agencyService: AgencyService,
        private alertService: AlertService
    ){

    }

    err: any = {}
    _certificate: any = {}
    title = 'Thêm mới certificate profile'
    configSetting = ConfigSetting


    closeModal() {
        this.display = false
        this.displayChange.emit(false)
    }

    actionCreateCertificate() {
        this.agencyService.createCertificateProfile(this._certificate).toPromise()
        .then((result: any) => {
            this.alertService.showSuccess('Thêm mới thành công')
            this.display = false
            this.displayChange.emit(false)
        })
        .catch((err: any) => {
            this.alertService.showError('Thêm mới thất bại.')
        })
    }

    actionUpdateCertificate() {
        this.agencyService.updateCertificateProfile(this._certificate, this._certificate.id).toPromise()
        .then((result: any) => {
            this.alertService.showSuccess('Cập nhật thành công')
            this.display = false
            this.displayChange.emit(false)
        })
        .catch((err: any) => {
            this.alertService.showError('Cập nhật thất bại.')
        })
    }

}
