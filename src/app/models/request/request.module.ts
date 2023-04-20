import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSetting } from '../../common/config/configSetting';
import { CustomerModule } from '../customer/customer.module';



@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class RequestModule {

    private id: string = '';
    private customerCer: string = '';
    private customerName: string = '';
    private agency: string = '';
    private typeRequestTitle: string = '';
    private typeRequestCode: string = '';
    private certificateProfileCode: string = '';
    private timeRequest: string = '';
    private timeUpdate: string = '';
    private statusCode: string = '';
    private statusTitle: string = '';
    private deviceType: string = '';
    private customerInfo: CustomerModule;
    private confirmRegistrationFile: boolean = false;
    private confirmIdCardFile: boolean = false;
    private confirmLicenseFile: boolean = false;
    private confirmRepresentativeFile: boolean = false;
    private phone: string = ''
    private iccid: string = ''
    private serialNo: string = ''
    private activationCode: string = ''
    private rejectReason: string = ''

    constructor() {
        this.customerInfo = new CustomerModule()
    }


    // Gắn giá trị cho requestmodule khi gọi api lấy ds request
    public setValue(item: any) {
        this.Id = item
        this.CustomerCer = item
        this.CustomerName = item
        this.Agency = item
        this.TypeRequestCode = item
        this.TypeRequestTitle = item
        this.CertificateProfileCode = item
        this.TimeRequest = item
        this.TimeUpdate = item
        this.StatusCode = item
        this.StatusTitle = item
        this.CustomerInfo = item
        this.DeviceType = item
        this.ConfirmRegistrationFile = item
        this.ConfirmIdCardFile = item
        this.ConfirmLicenseFile = item
        this.ConfirmRepresentativeFile = item
        this.Phone = item 
        this.ICCID = item
        this.SerialNo = item
        this.ActivationCode = item
        this.RejectReason = item

    }




    public set Id(item: string | any) {
        if(typeof item !== 'string'){
            this.id = item?.id || ''
        } else {
            this.id = item;
        }
    }
    
    public set CustomerCer(item: string | any) {        
        if(typeof item !== 'string'){
            this.customerCer = item?.customerInfo?.info?.identifyNo || '';
        } else {
            this.customerCer = item;
        }
    }
    
    public set CustomerName(item: string | any) {
        if(typeof item !== 'string'){
            this.customerName = item?.customerInfo?.info?.commonName || '';
        } else {
            this.customerName = item;
        }
    }
    
    public set Agency(item: string | any) {
        if(typeof item !== 'string'){
            this.agency = item?.agencyInfo?.name || '';
        } else {
            this.agency = item;
        }
    }
    
    public set TypeRequestTitle(item: string | any) {
        if(typeof item !== 'string'){
            if (this.typeRequestCode) {
                this.typeRequestTitle = ConfigSetting.requestType[this.typeRequestCode].name;
            }
        } else {
            this.typeRequestTitle = item;
        }
    }
    
    public set TypeRequestCode(item: string | any) {
        if(typeof item !== 'string'){
            this.typeRequestCode = item?.requestType || ''
        } else {
            this.typeRequestCode = item;
        }
    }
    
    public set CertificateProfileCode(item: string | any) {
        if(typeof item !== 'string'){
            this.certificateProfileCode = item?.certificateProfileInfo?.name || ''
        } else {
            this.certificateProfileCode = item;
        }
    }
    
    public set TimeRequest(item: string | any) {
        if(typeof item !== 'string'){
            this.timeRequest = item?.createdAt || ''
        } else {
            this.timeRequest = item;
        }
    }
    
    public set TimeUpdate(item: string | any) {
        if(typeof item !== 'string'){
            this.timeUpdate = item?.updatedAt || ''
        } else {
            this.timeUpdate = item;
        }
    }
    
    public set StatusCode(item: string | any) {
        if(typeof item !== 'string'){
            this.statusCode = item?.status || ''
        } else {
            this.statusCode = item;
        }
    }
    
    public set StatusTitle(item: string | any) {
        if(typeof item !== 'string'){
            if (this.statusCode) {
                const listStatus = ConfigSetting.requestStatusConfig
                let statusObject = listStatus.find(x => x.code === this.statusCode);
                if (statusObject) {
                    this.statusTitle = statusObject.name;
                }
            }
        } else {
            this.statusTitle = item;
        }
    }
    
    public set CustomerInfo(item: CustomerModule | any) {
        if (item?.customerInfo) {
            this.customerInfo.setValue(item.customerInfo)
        }
    }


    public set DeviceType(item: string | any) {
        if(typeof item !== 'string'){
            this.deviceType = item?.deviceType || ''
        } else {
            this.deviceType = item;
        }
    }
    
    public set ConfirmRegistrationFile(item: any | boolean) {
        if(typeof item !== 'boolean'){
            this.confirmRegistrationFile = item?.requestData?.confirmFile?.registrationFile || false
        } else {
            this.confirmRegistrationFile = item;
        }
    }
    public set ConfirmIdCardFile(item: any | boolean) {
        if(typeof item !== 'boolean'){
            this.confirmIdCardFile = item?.requestData?.confirmFile?.customer?.idCardFile || false
        } else {
            this.confirmIdCardFile = item;
        }
    }
    public set ConfirmLicenseFile(item: any | boolean) {
        if(typeof item !== 'boolean'){
            this.confirmLicenseFile = item?.requestData?.confirmFile?.customer?.licenseFile || false
        } else {
            this.confirmLicenseFile = item;
        }
    }
    public set ConfirmRepresentativeFile(item: any | boolean) {
        if(typeof item !== 'boolean'){
            this.confirmRepresentativeFile = item?.requestData?.confirmFile?.customer?.representativeFile || false
        } else {
            this.confirmRepresentativeFile = item;
        }
    }

    public set Phone(item: string | any) {
        if(typeof item !== 'string'){
            this.phone = item?.requestData?.simInfo?.phone || ''
        } else {
            this.phone = item;
        }
    }

    public set ICCID(item: string | any) {
        if(typeof item !== 'string'){
            this.iccid = item?.requestData?.simInfo?.ICCID || ''
        } else {
            this.iccid = item;
        }
    }
    public set SerialNo(item: string | any) {
        if(typeof item !== 'string'){
            this.serialNo = item?.requestData?.serialNo || ''
        } else {
            this.serialNo = item;
        }
    }
    public set ActivationCode(item: string | any) {
        if(typeof item !== 'string'){
            this.activationCode = item?.requestData?.activationCode || ''
        } else {
            this.activationCode = item;
        }
    }
    public set RejectReason(item: string | any) {
        if(typeof item !== 'string'){
            this.rejectReason = item?.rejectReason || ''
        } else {
            this.rejectReason = item;
        }
    }
    
    

    public get Id(): string {
        return this.id;
    }
    public get CustomerCer(): string {
        return this.customerCer;
    }
    public get CustomerName(): string {
        return this.customerName;
    }
    public get Agency(): string {
        return this.agency;
    }
    public get TypeRequestTitle(): string {
        return this.typeRequestTitle;
    }
    public get TypeRequestCode(): string {
        return this.typeRequestCode;
    }
    public get CertificateProfileCode(): string {
        return this.certificateProfileCode;
    }
    public get TimeRequest(): string {
        return this.timeRequest;
    }
    public get TimeUpdate(): string {
        return this.timeUpdate;
    }
    public get StatusCode(): string {
        return this.statusCode;
    }
    public get StatusTitle(): string {
        return this.statusTitle;
    }
    public get CustomerInfo(): CustomerModule {
        return this.customerInfo;
    }
    public get DeviceType(): string {
        return this.deviceType;
    }
    public get ConfirmRegistrationFile(): boolean {
        return this.confirmRegistrationFile;
    }
    public get ConfirmIdCardFile(): boolean {
        return this.confirmIdCardFile;
    }
    public get ConfirmLicenseFile(): boolean {
        return this.confirmLicenseFile;
    }
    public get ConfirmRepresentativeFile(): boolean {
        return this.confirmRepresentativeFile;
    }
    public get Phone(): string {
        return this.phone;
    }
    public get ICCID(): string {
        return this.iccid;
    }
    public get SerialNo(): string {
        return this.serialNo;
    }
    public get ActivationCode(): string {
        return this.activationCode;
    }
    public get RejectReason(): string {
        return this.rejectReason;
    }


}
