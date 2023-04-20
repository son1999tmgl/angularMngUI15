import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSetting } from 'src/app/common/config/configSetting';



@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class FileNEACModule {
    public id: string = '';
    public customerName: string = '';
    public agency: string = '';
    public typeCustomer: string = '';
    public typeTransactionCode: string = '';
    public typeTransactionTitle: string = '';
    public namePackage: string = '';
    public createTime: string = ''
    public revokeTime: string = ''
    public statusCode: string = ''
    public statusTitle: string = ''
    public syncToNEAC: boolean = false

    public constructor() { }

    public setValue(item: any) {
        this.id = item?.requestInfo?.customerIdentifyNo || ''
        this.customerName = item?.requestInfo?.customerInfo?.info?.commonName || ''
        this.agency = item?.requestInfo?.agencyInfo?.name || ''
        this.typeCustomer = item?.requestInfo?.customerInfo?.type || ''
        this.typeTransactionCode = item?.requestInfo?.requestType || ''
        if (this.typeTransactionCode) {
            if (this.typeTransactionCode == ConfigSetting.ListRequestType['REVOKE_CERTIFICATE'].code) {
                this.revokeTime = item?.certificateInfo?.createdAt
            }
            this.typeTransactionTitle = ConfigSetting.ListRequestType[this.typeTransactionCode].name
        }
        this.namePackage = item?.requestInfo?.certificateProfileCode || ''
        this.createTime = item?.issuedCertTime || ''
        if (item?.requestInfo?.status) {
            this.statusCode = item?.requestInfo?.status
            const listStatus = ConfigSetting.requestStatusConfig
            let statusObject = listStatus.find(x => x.code === this.statusCode);
            if (statusObject) {
                this.statusTitle = statusObject.name;
            }
        }
        this.syncToNEAC = item?.syncToNEAC || false
    }



}
