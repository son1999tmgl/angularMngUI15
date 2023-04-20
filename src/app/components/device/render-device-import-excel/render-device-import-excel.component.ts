import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { myFunc } from 'src/app/common/myFunc';
import { AlertService } from 'src/app/common/services/Alert.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DeviceService } from 'src/app/services/device.service';
import { read, utils } from 'xlsx';

@Component({
    selector: 'app-render-device-import-excel',
    templateUrl: './render-device-import-excel.component.html',
    styleUrls: ['./render-device-import-excel.component.scss']
})
export class RenderDeviceImportExcelComponent implements OnInit {
    @ViewChild('inputFileImport') inputFileImport: any
    title = 'Danh sách giao dịch'
    value: number = 0
    configSetting = ConfigSetting
    device: any = {
        deviceType: '',
        deviceStatus: ''
    }
    listDeviceStatus = Object.values(this.configSetting.certificateStatus)
    totalRecord = 0
    params = {
        page: 1,
        perPage: 10
    }
    fileImport: any = ''
    listCustomerId: any = {}
    listDeviceCustomer: any = []
    // Biến tạm lưu tất cả dữ liệu
    listDeviceCustomerTemp: any = []

    objectSelected: any = {}
    dataSelectAll = false

    constructor(
        private customerService: CustomerService,
        private deviceService: DeviceService,
        private alertService: AlertService
    ) {

    }

    ngOnInit(): void {
        // let interval = setInterval(() => {
        //     this.value = this.value + Math.floor(Math.random() * 10) + 1;
        //     if (this.value >= 100) {
        //         this.value = 0;
        //         // clearInterval(interval);
        //     }
        // }, 1000);
    }

    paginate(event: any) {
        this.params.page = event.page + 1
        this.params.perPage = event.rows
        // this.actionListUser()
    }

    actionImortFile() {
        this.inputFileImport.nativeElement.click()
    }

    //đọc file excel
    readerFile($event: any) {
        const files = $event.target.files;
        console.log('file: ', files);

        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    this.listCustomerDevice(rows.map((row: any) => row['MST/CMND']))

                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    listCustomerDevice(identifiNo: any) {
        this.listDeviceCustomer = []

        this.customerService.ListCustomerDevice({ 'identifyNo': identifiNo }).toPromise()
            .then((result: any) => {
                this.listDeviceCustomer = result
                this.listDeviceCustomerTemp = [...this.listDeviceCustomer]
                this.setDefaultSelect()
            })
            .catch((err: any) => {
                console.log('err: ', err);

            })
    }

    changeFilters() {
        this.listDeviceCustomer = []
        this.objectSelected = {}
        this.listDeviceCustomerTemp.forEach((item: any) => {
            if (myFunc.isEmpty(this.device.deviceType)
                && myFunc.isEmpty(this.device.deviceStatus)) {
                this.listDeviceCustomer.push(item)
            } else if (
                (myFunc.isEmpty(this.device.deviceType) && item.status == this.device.deviceStatus)
                || (myFunc.isEmpty(this.device.deviceStatus) && item.deviceType == this.device.deviceType)
                || (item.status == this.device.deviceStatus && item.deviceType == this.device.deviceType)
            ) {
                this.listDeviceCustomer.push(item)
            }
        });
        this.setDefaultSelect()
    }

    actionSelectAll() {
        this.dataSelectAll = !this.dataSelectAll
        Object.keys(this.objectSelected).forEach(key => this.objectSelected[key] = this.dataSelectAll);
    }

    setDefaultSelect() {
        this.dataSelectAll = false
        this.objectSelected = {}
        this.listDeviceCustomer.forEach((item: any) => {
            this.objectSelected[item.id] = false
        })
    }

    actionCreateRequestDevices(requestDeviceType: string) {
        let arrSlected = Object.keys(this.objectSelected).filter((key: any) => {
            return this.objectSelected[key] === true
        })

        this.value = 0
        let index = 1
        this.listDeviceCustomer.forEach(async (device: any) => {

            if (arrSlected.includes(device.id.toString())) {
                let body = this.getBody(device, requestDeviceType)
                await this.deviceService.createRequestDevices(body).toPromise()
                    .then((result: any) => {
                        this.alertService.showSuccess('Thêm mới giao dịch thành công.')
                    })
                    .catch((err: any) => {
                        this.alertService.showError('Thêm mới giao dịch thất bại.')
                        console.log('err: ', err);
                    })
                    .finally(() => {
                        this.value = Math.round((100/arrSlected.length)*index)
                        index++
                    })

            }
        });
    }


    getBody(item: any, requestDeviceType: string) {
        let info: any = myFunc.clientInfo(item.customer)
        let body: any = {
            'customerInfo': {
                'info': info,
                'type': item?.customer?.type || '',
                'idCardFile': info?.idCardFile || [],
                'organizationFile': info?.organizationFile || [],
                'licenseFile': info?.licenseFile || [],
                'representativeFile': info?.representativeFile || [],
            },
            'deviceType': item.deviceType,
            'requestDeviceType': requestDeviceType,
            'customerId': item?.customer?.id || '',
            'deviceSerialNo': item.deviceInfo.ICCID,
            'reason': 'Newtel tiến hành mở khóa/khóa tự động'
        }
        return body
    }




}
