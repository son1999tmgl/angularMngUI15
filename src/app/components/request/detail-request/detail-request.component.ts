import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestModule } from 'src/app/models/request/request.module';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { TINH_TP } from 'src/app/common/config/region/tinh_tp';
import { QUAN_HUYEN } from 'src/app/common/config/region/quan_huyen';
import { FileService } from 'src/app/services/file.service';
import { AlertService } from 'src/app/common/services/Alert.service';
import { myFunc } from 'src/app/common/myFunc';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';


interface MyFormControlOptions extends FormControlOptions {
    label?: string;
}

@Component({
    selector: 'app-detail-request',
    templateUrl: './detail-request.component.html',
    styleUrls: ['./detail-request.component.scss']
})
export class DetailRequestComponent implements OnInit {

    @ViewChild('closeModalArchiveRequest') closeModalArchiveRequest: any
    @ViewChild('closeModalRejectRequest') closeModalRejectRequest: any
    @ViewChild('closeModalApprovalRequest') closeModalApprovalRequest: any

    public requestId: string = ''
    public requestInfo: RequestModule = new RequestModule()
    public ref: any
    public configSetting = ConfigSetting
    public TINH_TP = TINH_TP
    public QUAN_HUYEN = QUAN_HUYEN
    public listLicenseFile: Array<any> = []
    public _listLicenseFile: Array<any> = []
    public listIdCardFile: Array<any> = []
    public _listIdCardFile: Array<any> = []
    public listRepresentativeFile: Array<any> = []
    public _listRepresentativeFile: Array<any> = []
    public listRegistrationFile: Array<any> = []
    public _listRegistrationFile: Array<any> = []
    public title = 'Thông tin chi tiết giao dịch'
    public disable = true
    public data = {
        reason: {
            archiveRequest: '',
            rejectRequest: ''
        }
    }

    public formControlOptions: MyFormControlOptions = {
        validators: [Validators.required, Validators.minLength(2)],
        label: 'Tên giao dịch'
      };
    public formInfoCustomer = new FormGroup({
        requestName: new FormControl('', this.formControlOptions)
    });


    constructor(
        private requestService: RequestService,
        private route: ActivatedRoute,
        private fileService: FileService,
        private router: Router,
        private alertService: AlertService
    ) {
        this.route.queryParams.subscribe(params => {
            this.requestId = params['id']
        });


    }


    handleFiles(event: any) {


    }

    ngOnInit() {
        this.getDataRequestInfo()
    }

    async getDataRequestInfo() {
        this.ref = await this.requestService.requestInfo(this.requestId).toPromise()
            .then(
                async (result: any) => {
                    // this.requestInfo = result
                    this.requestInfo.setValue(result)
                    if (this.requestInfo.StatusCode == this.configSetting.requestStatus['progress'].code) {
                        this.disable = false
                    } else {
                        this.disable = true
                    }

                    console.log(this.requestInfo);

                    if (result.customerInfo.type == this.configSetting.clientConfig['ORGANIZATION'].code) {
                        this.listLicenseFile = await this.getFile(result.customerInfo.licenseFile)
                        this._listLicenseFile = [...this.listLicenseFile]
                        this.listRepresentativeFile = await this.getFile(result.customerInfo.licenseFile)
                        this._listRepresentativeFile = [...this.listRepresentativeFile]
                    } else if (result.customerInfo.type == this.configSetting.clientConfig['PERSONAL'].code) {
                        this.listIdCardFile = await this.getFile(result.customerInfo.idCardFile)
                        this._listIdCardFile = [...this.listIdCardFile]
                    } else if (result.customerInfo.type == this.configSetting.clientConfig['STAFF'].code) {

                    }

                    this.listRegistrationFile = await this.getFile(result.registrationFile)

                }
            ).catch((err: any) => {
                console.error('err', err);
            })
    }

    public async getFile(licenseFile: any) {
        let temp = new Array<any>
        if (licenseFile.length > 0) {
            let promises: Promise<any>[] = [];
            licenseFile.forEach(async (file: any) => {
                promises.push(this.fileService.getFileLicense(file.fileUrl).toPromise())
            });
            await Promise.all(promises)
                .then((result: any) => {
                    result.forEach((rel: any) => {
                        temp.push({
                            url: rel.link,
                            type: 'img',
                            available: true,
                            deleteFile: false
                        })
                    })
                })
                .catch((err: any) => {
                    console.log('err: ', err);

                })
        }
        return temp
    }

    showModal() {
        // $('#myModal').modal('show')
    }


    //Huỷ giao dịch
    archiveRequest() {
        this.requestService.archiveRequest(this.requestId, this.data.reason.archiveRequest)?.toPromise()
            .then((result: any) => {
                this.closeModalArchiveRequest.nativeElement.click();
                this.alertService.showSuccess('Huỷ giao dịch thành công.')
                this.router.navigate(['/renderListRequest']);
            })
            .catch((err: any) => {
                let alertErr = myFunc.getError(err)
                if (typeof alertErr == 'string') {
                    this.alertService.showError(alertErr);
                }
            })
    }

    // Từ chối giao dịch
    rejectRequest() {
        this.requestService.rejectRequest(this.requestId, this.data.reason.rejectRequest)?.toPromise()
            .then((result: any) => {
                this.closeModalRejectRequest.nativeElement.click();
                this.alertService.showSuccess('Từ chối giao dịch thành công.')
                this.router.navigate(['/renderListRequest']);
            })
            .catch((err: any) => {
                let alertErr = myFunc.getError(err)
                if (typeof alertErr == 'string') {
                    this.alertService.showError(alertErr);
                }
            })
    }


    // Duyệt giao dịch
    approvalRequest() {
        if (this.formInfoCustomer.valid) {

        } else {
            console.log(this.formInfoCustomer.controls);
        }
        return
        let confirmFileCustomer: any = {}
        let customerInfo: any = {}


        customerInfo.type = this.requestInfo.CustomerInfo.Type
        confirmFileCustomer.type = this.requestInfo.CustomerInfo.Type
        customerInfo.info = {}
        switch (this.requestInfo.CustomerInfo.Type) {
            case this.configSetting.clientConfig['PERSONAL'].code:
                customerInfo.info.commonName = this.requestInfo.CustomerInfo.CommonName
                customerInfo.info.identifyNo = this.requestInfo.CustomerInfo.IdentifyNo
                customerInfo.info.email = this.requestInfo.CustomerInfo.Email
                customerInfo.info.phone = this.requestInfo.CustomerInfo.Phone
                customerInfo.info.city = this.requestInfo.CustomerInfo.City
                customerInfo.info.district = this.requestInfo.CustomerInfo.District
                customerInfo.info.idCardType = this.requestInfo.CustomerInfo.IdCardType
                customerInfo.idCardFile = this._listIdCardFile


                confirmFileCustomer.idCardFile = this.requestInfo.ConfirmIdCardFile
                break
            case this.configSetting.clientConfig['ORGANIZATION'].code:
                customerInfo.info.commonName = this.requestInfo.CustomerInfo.CommonName
                customerInfo.info.identifyNo = this.requestInfo.CustomerInfo.IdentifyNo
                customerInfo.info.licenseType = this.requestInfo.CustomerInfo.LicenseType
                customerInfo.info.email = this.requestInfo.CustomerInfo.Email
                customerInfo.info.phone = this.requestInfo.CustomerInfo.Phone
                customerInfo.info.city = this.requestInfo.CustomerInfo.City
                customerInfo.info.district = this.requestInfo.CustomerInfo.District
                customerInfo.info.representativeName = this.requestInfo.CustomerInfo.RepresentativeName
                customerInfo.licenseFile = this._listLicenseFile
                customerInfo.representativeFile = this._listRepresentativeFile
                confirmFileCustomer.licenseFile = this.requestInfo.ConfirmLicenseFile
                confirmFileCustomer.representativeFile = this.requestInfo.ConfirmRepresentativeFile
                break
            case this.configSetting.clientConfig['STAFF'].code:
                break
        }
        let data = {
            'updateRequest': {
                'customerInfo': customerInfo
            },
            'confirmFile': {
                'customer': confirmFileCustomer,
                'registrationFile': this.requestInfo.ConfirmRegistrationFile
            }
        }


        this.requestService.approvalRequest(this.requestId, data)?.toPromise()
            .then((result: any) => {
                this.closeModalApprovalRequest.nativeElement.click();
                this.alertService.showSuccess('Phê duyệt thành công.')
                this.router.navigate(['/renderListRequest']);
            })
            .catch((err: any) => {
                this.closeModalApprovalRequest.nativeElement.click();
                let alertErr = myFunc.getError(err)
                if (typeof alertErr == 'string') {
                    this.alertService.showError(alertErr);
                }
            })
    }


    // Phê duyệt giao dịch
    confirmationRequest() {
        let body = {
            'confirmFile': [],
            'registrationFile': [
                {
                    'fileName': '',
                    'fileContent': ''
                }
            ],
            'customerInfo': [],
            "confirmationFile": []
        }
    }

    comeBack() {
        this.router.navigate(['/renderListRequest']);
    }


}
