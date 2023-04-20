import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TINH_TP } from 'src/app/common/config/region/tinh_tp';
import { QUAN_HUYEN } from 'src/app/common/config/region/quan_huyen';
import { myFunc } from 'src/app/common/myFunc';
import { ConfigSetting } from 'src/app/common/config/configSetting';



@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class CustomerModule {
    private id: string | undefined | any = '';
    private commonName: string | undefined | any = '';
    private identifyNo: string | undefined | any = '';
    private city: string | undefined | any = '';
    private district: string | undefined | any = '';
    private ward: string | undefined | any = '';
    private type: string | undefined | any = '';
    private phone: string | undefined | any = '';
    private email: string | undefined | any = '';
    private createdAt: string | undefined | any = '';
    private updatedAt: string | undefined | any = '';
    private customerBussinessInfo: any = {};
    private customerPersonalInfo: any = {};
    private customerStaffInfo: any = {};
    private customerInfo: any = {};
    private cityName: string | undefined | any = '';
    private districtName: string | undefined | any = '';
    private representativeName: string | undefined | any = '';
    private idCardType: string | undefined | any = '';
    private licenseType: string | undefined | any = '';
    private address: string | any = '';
    private typeName: string | any = ''

    constructor() {
        
    }


    public setValue(item: any) {
        this.Id = item
        this.CommonName = item
        this.IdentifyNo = item
        this.City = item
        this.District = item
        this.Ward = item
        this.Type = item
        this.Phone = item
        this.Email = item
        this.CreatedAt = item
        this.UpdatedAt = item
        this.CustomerBussinessInfo = item
        this.CustomerPersonalInfo = item
        this.CustomerStaffInfo = item
        this.CityName = item
        this.DistrictName = item
        this.CustomerInfo = item
        this.RepresentativeName = item
        this.IdCardType = item
        this.LicenseType = item
        this.TypeName = item
    }



    public set Id(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.id = item?.id || ''
        } else {
            this.id = item;
        }
    }

    public set CommonName(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.commonName = item?.commonName
                || item?.info?.commonName
                || ''
        } else {
            this.commonName = item;
        }
    }

    public set IdentifyNo(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.identifyNo = item?.identifyNo
                || item?.info?.identifyNo
                || ''
        } else {
            this.identifyNo = item;
        }
    }

    public set City(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.city = item?.city
                || item?.info?.city
                || ''
        } else {
            this.city = item;
        }
    }

    public set District(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.district = item?.district
                || item?.info?.district 
                || ''
        } else {
            this.district = item;
        }
    }

    public set Ward(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.ward = item?.ward 
            || item?.info?.ward
            || ''
        } else {
            this.ward = item;
        }
    }

    public set Type(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.type = item.type || ''
        } else {
            this.type = item;
        }
    }

    public set Phone(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.phone = item?.phone 
            || item?.info?.phone
            || ''
        } else {
            this.phone = item;
        }
    }
    public set Email(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.email = item?.email 
            || item?.info?.email
            || item?.customerBussinessInfo?.email
            || item?.customerPersonalInfo?.email
            || ''
        } else {
            this.email = item;
        }
    }

    public set CreatedAt(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.createdAt = this.createdAt || ''
        } else {
            this.createdAt = item;
        }
    }

    public set UpdatedAt(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.updatedAt = item?.updatedAt || ''
        } else {
            this.updatedAt = item;
        }
    }

    public set CustomerBussinessInfo(item: any) {
        if (typeof item != 'string') {
            this.customerBussinessInfo = item?.customerBussinessInfo || ''
        } else {
            this.customerBussinessInfo = item;
        }
    }

    public set CustomerPersonalInfo(item: any) {
        if (typeof item != 'string') {
            this.customerPersonalInfo = item?.customerPersonalInfo || ''
        } else {
            this.customerPersonalInfo = item;
        }
    }

    public set CustomerStaffInfo(item: any) {
        if (typeof item != 'string') {
            this.customerStaffInfo = item?.customerStaffInfo || ''
        } else {
            this.customerStaffInfo = item;
        }
    }


    public set RepresentativeName(item: string | any) {
        if (typeof item != 'string') {
            this.representativeName = item?.info?.representativeName || ''
        } else {
            this.representativeName = item;
        }
    }

    public set CustomerInfo(item: any) {
        if (typeof item != 'string') {
            switch (this.type) {
                case ConfigSetting.clientConfig['PERSONAL'].code:
                    this.customerInfo = this.customerPersonalInfo
                    break
                case ConfigSetting.clientConfig['ORGANIZATION'].code:
                    this.customerInfo = this.customerBussinessInfo
                    break
                case ConfigSetting.clientConfig['STAFF'].code:
                    this.customerInfo = this.customerStaffInfo
                    break
            }
        } else {
            this.customerInfo = item;
        }
    }

    public set CityName(item: string | undefined | any) {
        if (typeof item != 'string') {
            if (this.city) {
                this.cityName = TINH_TP[this.city].name
            }
        } else {
            this.cityName = item;
        }
    }

    public set DistrictName(item: string | undefined | any) {
        if (typeof item != 'string') {
            if (this.district) {
                this.districtName = QUAN_HUYEN[this.district].name_with_type
            }
        } else {
            this.districtName = item;
        }
    }

    public set IdCardType(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.idCardType = item?.info?.idCardType ||  ''
        } else {
            this.idCardType = item;
        }
    }

    public set LicenseType(item: string | undefined | any) {
        if (typeof item != 'string') {
            this.licenseType = item?.info?.licenseType ||  ''
        } else {
            this.licenseType = item;
        }
    }

    public set TypeName(item: string | any) {
        this.typeName = ConfigSetting.clientConfig[this.type].name
    }





    public get Id(): string | undefined {
        return this.id;
    }

    public get CommonName(): string | undefined {
        return this.commonName;
    }

    public get IdentifyNo(): string | undefined {
        return this.identifyNo;
    }

    public get City(): string | undefined {
        return this.city;
    }

    public get District(): string | undefined {
        return this.district;
    }

    public get Ward(): string | undefined {
        return this.ward;
    }

    public get Type(): string | undefined {
        return this.type.toString();
    }

    public get Phone(): string | undefined {
        return this.phone;
    }

    public get Email(): string | undefined {
        return this.email;
    }

    public get CreatedAt(): string | undefined {
        return this.createdAt;
    }

    public get UpdatedAt(): string | undefined {
        return this.updatedAt;
    }

    public get CustomerBussinessInfo(): any {
        return this.customerBussinessInfo;
    }

    public get CustomerPersonalInfo(): any {
        return this.customerPersonalInfo;
    }

    public get CustomerStaffInfo(): any {
        return this.customerStaffInfo;
    }

    public get CustomerInfo(): any {
        return this.customerInfo;
    }

    public get CityName(): string | undefined {
        return this.cityName;
    }

    public get DistrictName(): string | undefined {
        return this.districtName;
    }
    public get RepresentativeName(): string | undefined {
        return this.representativeName;
    }
    public get IdCardType(): string | undefined {
        return this.idCardType;
    }
    public get LicenseType(): string | undefined {
        return this.licenseType;
    }
    public get Adress(): string | undefined {
        return this.districtName + ' - ' + this.cityName;
    }
    public get TypeName(): string | undefined {
        return this.typeName
    }



}
