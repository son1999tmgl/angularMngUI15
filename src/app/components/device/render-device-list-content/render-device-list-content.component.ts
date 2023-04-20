import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import * as moment from 'moment';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { myFunc } from 'src/app/common/myFunc';
import { DeviceModule } from 'src/app/models/device/device.module';
import { DeviceService } from 'src/app/services/device.service';

@Component({
    selector: 'app-render-device-list-content',
    templateUrl: './render-device-list-content.component.html',
    styleUrls: ['./render-device-list-content.component.scss']
})
export class RenderDeviceListContentComponent implements OnInit{
    @Input()
    set customerId(value: string) {
        if(!myFunc.isEmpty(value)){
            this.params.customerId = value
        }
    }
    constructor(
        private deviceService: DeviceService,
    ) {
        this.status = ConfigSetting.requestStatusConfig
        this.listDevices = ConfigSetting.listDevices
    }

    ngOnInit(): void {
        this.listRenderDevice()

    }
    status: any
    listDevices: any

    totalRecord = 0
    params = {
        page: 1,
        perPage: 20,
        orderBy: "updatedAt",
        sortBy: "DESC",
        freeText: '',
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().endOf('month').format('YYYY-MM-DD'),
        status: '',
        requestDeviceType: '',
        customerId: '',
        deviceType: ''
    }
    data = {
        filters: {
            freeText: '',
            to: moment().startOf('month').format('YYYY-MM-DD'),
            from: moment().endOf('month').format('YYYY-MM-DD'),
            agency: '',
            status: '',
            requestDeviceType: '',
            deviceType: ''
        }
    }

    dataListRenderDevice: Array<DeviceModule> = []
    dataListDeviceType = ConfigSetting.listDeviceType


    paginate(event: any) {
        this.params.page = event.page + 1
        this.params.perPage = event.rows
        this.listRenderDevice()
    }



    changeFilters(field: string) {
        console.log(this.data.filters);
        this.params.page = 1
        if (field == 'search') {
            this.params.freeText = this.data.filters.freeText
        } else if (field == 'to') {
            this.params.endDate = format(new Date(this.data.filters.to), 'yyyy-MM-dd');
        } else if (field == 'from') {
            this.params.startDate = format(new Date(this.data.filters.from), 'yyyy-MM-dd');
        } else if (field == 'status') {
            this.params.status = this.data.filters.status || ''
        } else if (field == 'requestDeviceType') {
            this.params.requestDeviceType = this.data.filters.requestDeviceType || ''
        } else if(field == 'deviceType') {
            this.params.deviceType = this.data.filters.deviceType || ''
        }
        if(this.params.customerId){
            this.actionSearch()
        }
    }

    listRenderDevice() {
        this.deviceService.listRequest(this.params)
            .subscribe(
                (result: any) => {
                    console.log('result: ', result)
                    this.dataListRenderDevice = []
                    this.totalRecord = result.total
                    for (const item of result.data) {
                        let dev = new DeviceModule()
                        dev.setValue(item)
                        this.dataListRenderDevice.push(dev)
                    }
                    console.log('this.dataListRequest: ', this.dataListRenderDevice)
                },
                (error: any) => {
                    console.log('error: ', error);
                }
            )
    }
    actionSearch() {
        this.listRenderDevice()
    }
}
