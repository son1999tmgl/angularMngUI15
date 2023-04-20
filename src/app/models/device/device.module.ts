import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSetting } from 'src/app/common/config/configSetting';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DeviceModule { 
    customer: string = ''
	identifyNo: string = ''
	requestDeviceType: string = ''
	deviceSerialNo: string = ''
	deviceType: string = ''
	createdAt: string = ''
	statusCode: string = ''
	statusTitle: string = ''
	updatedAt: string = ''	

	public setValue(item: any) {
		this.customer = item?.customerInfo?.info?.commonName
		this.identifyNo = item?.customerInfo?.info?.identifyNo
		this.requestDeviceType = item?.requestDeviceType
		this.deviceSerialNo = item?.deviceSerialNo
		this.deviceType = item?.deviceType
		this.createdAt = item?.createdAt
		this.updatedAt = item?.updatedAt
		this.statusCode = item?.status || ''
		if (this.statusCode) {
		const listStatus = ConfigSetting.requestStatusConfig
		let statusObject = listStatus.find(x => x.code === this.statusCode);
		if (statusObject) {
			this.statusTitle = statusObject.name;
		}
		}
	}
}
