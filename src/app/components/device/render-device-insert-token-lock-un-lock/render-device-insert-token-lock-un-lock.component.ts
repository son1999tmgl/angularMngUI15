import { Component, OnInit } from '@angular/core';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { AlertService } from 'src/app/common/services/Alert.service';
import { CustomerModule } from 'src/app/models/customer/customer.module';
import { CustomerService } from 'src/app/services/customer.service';
import { DomSanitizer } from '@angular/platform-browser';
import { myFunc } from 'src/app/common/myFunc';
import { DeviceService } from 'src/app/services/device.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';



@Component({
    selector: 'app-render-device-insert-token-lock-un-lock',
    templateUrl: './render-device-insert-token-lock-un-lock.component.html',
    styleUrls: ['./render-device-insert-token-lock-un-lock.component.scss']
})
export class RenderDeviceInsertTokenLockUnLockComponent implements OnInit {
    ngOnInit(): void {


    }

    constructor(
        private customerService: CustomerService,
        private alertService: AlertService,
        private sanitizer: DomSanitizer,
        private deviceService: DeviceService,
        private router: Router

    ) {

    }

    base64test = ''
    title = 'Thêm mới giao dịch'
    disableIdentifyNo = false
    dataListClientType = ConfigSetting.listClientType
    dataListDeviceType = ConfigSetting.listDeviceType
    dataListDevices = ConfigSetting.listDevices
    dataListDeviceIds: Object | Array<any> | undefined | any = []
    file: any = '';
    dataCustomer: CustomerModule = new CustomerModule()
    clientInfo: any = myFunc.clientInfo({})

    // ds file tải lên
    registrationFile: any = []

    data = {
        identifyNo: '',
        customerType: 'PERSONAL',
        deviceType: '',
        deviceCode: '',
        deviceId: '',
        reason: '',
    }

    previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
    pdfSrc = "";
    imageSrc: any = ""
    listFiles: any = [];

    searchCustomer = async () => {
        this.disableIdentifyNo = false
        if (this.data.identifyNo) {
            try {
                const result = await this.customerService.searchCustomer(this.data.identifyNo).toPromise();
                if (Array.isArray(result) && result.length > 0) {
                    const rel: any = await this.customerService.detailCustomer(result[0].id).toPromise();
                    this.dataCustomer.setValue(rel)
                    console.log('rel', this.dataCustomer);
                    this.disableIdentifyNo = true
                    this.data.customerType = rel.type
                    this.clientInfo = myFunc.clientInfo(rel)

                } else {
                    this.alertService.showWarning('Không tìm thấy mã số hợp lệ.')
                }
            } catch (err) {
                this.alertService.showError('Có lỗi xảy ra trong quá trình xử lý.')
            }

        }
    }

    onFileChange(event: any) {
        this.file = event;
        console.log(event);


    }


    handleFiles(listFiles: any) {
        this.registrationFile = []
        if (listFiles.length > 0) {
            listFiles.forEach((file:any) => {
                myFunc.getObjectFromBlobUrl(file.url.changingThisBreaksApplicationSecurity, file.name)
                    .then((result: any) => {
                        this.registrationFile.push(result)
                    })
            })
        }


    }

    async changeDevice() {
        if (!myFunc.isEmpty(this.data.deviceCode) && !myFunc.isEmpty(this.data.deviceType)) {
            let params: any = {};
            if (this.data.deviceCode == 'UNLOCK_DEVICE') {
                params.deviceStatus = 'suspend';
            } else {
                params.deviceStatus = 'available';
            }
            params.customerId = this.dataCustomer.Id
            params.deviceType = this.data.deviceType;

            let result = await this.customerService.ListCustomerDevice(params).toPromise()
            this.dataListDeviceIds = result;
            // _.forEach(this.dataListDeviceIds, (device) => {
                
            // })
            // console.log('dataListDeviceIds:', this.dataListDeviceIds);

        }

    }

    async createRequestDevices() {
        let body: any = {
            'customerInfo': {
                'info': this.clientInfo,
                'type': this.clientInfo.type,
                'idCardFile': this.clientInfo?.idCardFile || [],
                'organizationFile': this.clientInfo?.organizationFile || [],
                'licenseFile': this.clientInfo?.licenseFile || [],
                'representativeFile': this.clientInfo?.representativeFile || [],
            },
            'deviceType': this.data.deviceType,
            'requestDeviceType': this.data.deviceCode,
            'customerId': this.dataCustomer.Id,
            'deviceSerialNo': this.data.deviceId,
            'reason': this.data.reason
        }
        if (this.registrationFile.length > 0) {
            body['registrationFile'] = this.registrationFile
        }
        await this.deviceService.createRequestDevices(body).toPromise()
            .then((result: any) => {
                this.alertService.showSuccess('Thêm mới giao dịch thành công.')
                this.actionBack()
            })
            .catch((err: any) => {
                this.alertService.showError('Thêm mới giao dịch thất bại.')
                console.log('err: ', err);
            })


    }

    actionBack() {
        this.router.navigate(['/renderDeviceList']);
    }

}
