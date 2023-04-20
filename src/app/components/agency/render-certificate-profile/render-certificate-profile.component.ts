import { Component, Input, ViewChild } from '@angular/core';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { AlertService } from 'src/app/common/services/Alert.service';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
    selector: 'app-render-certificate-profile',
    templateUrl: './render-certificate-profile.component.html',
    styleUrls: ['./render-certificate-profile.component.scss']
})
export class RenderCertificateProfileComponent {
    @ViewChild('closeModalDeleteCertificateProfile') closeModalDeleteCertificateProfile: any
    @ViewChild('closeModalPublishCertificateProfile') closeModalPublishCertificateProfile: any
    @ViewChild('closeModalArchiveCertificateProfile') closeModalArchiveCertificateProfile: any
    _agencyId: string|number = 0
    @Input()
    set agencyId(value: string|number) {
        if (this.agencyId != 0) {
            this._agencyId = value
            this.actionListCertificateProfile()
        }
    }
    dataListCertificateProfiles: any = []
    params = {
        page: 1,
        perPage: 20,
        freeText: ''
    }
    totalRecord = 0
    displayModal = false
    selectedCertificateProfileId: string | number = 0
    selectedCertificateProfile: any = {}
    configSetting = ConfigSetting
    constructor(
        private agencyService: AgencyService,
        private alertService: AlertService
    ) {
        this.actionListCertificateProfile()
    }

    //ds
    async actionListCertificateProfile() {
        if (this._agencyId != 0) {
            await this.agencyService.listCertificateProfile(this._agencyId, this.params).toPromise()
                .then((result: any) => {
                    this.dataListCertificateProfiles = result.data
                    this.totalRecord = result.total
                })
                .catch((err: any) => {
                    console.log('err: ', err);
                })
        }
    }

    paginate(event: any) {
        this.params.page = event.page + 1
        this.params.perPage = event.rows
        this.actionListCertificateProfile()
    }

    onDeleteCertificateProfile(id: string | number) {
        this.selectedCertificateProfileId = id        
    }

    //xoá certificate
    deleteCertificateProfile() {
        this.agencyService.deleteCertificateProfile(this.selectedCertificateProfileId).toPromise()
            .then((result: any) => {
                this.alertService.showSuccess('Xoá certificateProfile thành công.')
                this.closeModalDeleteCertificateProfile.nativeElement.click()
                this.actionListCertificateProfile()
            })
            .catch((err: any) => {
                this.alertService.showError('Có lỗi xảy ra trong quá trính xử lý.')
                console.log('er: ', err);

            })
    }

    //công khai certificate
    publishCertificateProfile() {
        this.agencyService.publishCertificateProfile(this.selectedCertificateProfileId).toPromise()
        .then((result: any) => {
            this.alertService.showSuccess('Công khai chứng thư thành công.')
            this.closeModalPublishCertificateProfile.nativeElement.click()
            this.actionListCertificateProfile()
        })
        .catch((err: any) => {
            this.alertService.showError('Có lỗi xảy ra trong quá trính xử lý.')
            console.log('er: ', err);

        })
    }

    //lưu trữ certificate
    archiveCertificateProfile() {
        this.agencyService.archiveCertificateProfile(this.selectedCertificateProfileId).toPromise()
        .then((result: any) => {
            this.alertService.showSuccess('Lưu trữ chứng thư thành công.')
            this.closeModalArchiveCertificateProfile.nativeElement.click()
            this.actionListCertificateProfile()
        })
        .catch((err: any) => {
            this.alertService.showError('Có lỗi xảy ra trong quá trính xử lý.')
            console.log('er: ', err);

        })
    }

    convertRequestType(status: string): string {
        if (status == this.configSetting.requestType[status].code) {
            return this.configSetting.requestType[status].name || ''
        }
        return ''
    }

    convertCertificateStatus(status: string) {
        if (status == this.configSetting.certificateProfileStatus[status].code) {
            return this.configSetting.certificateProfileStatus[status].name || ''
        }
        return ''
    }

    displayChange(event: any) {
        this.selectedCertificateProfileId = 0
        this.selectedCertificateProfile = {}
        this.actionListCertificateProfile()
    }

    openModalDetail(certificate: any){
        this.selectedCertificateProfile = certificate
        this.selectedCertificateProfileId = certificate.id
        this.displayModal = true
    }


}
