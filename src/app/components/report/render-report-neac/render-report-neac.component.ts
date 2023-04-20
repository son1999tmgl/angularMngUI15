import { Component } from '@angular/core';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { ReportService } from 'src/app/services/report.service';

@Component({
    selector: 'app-render-report-neac',
    templateUrl: './render-report-neac.component.html',
    styleUrls: ['./render-report-neac.component.scss']
})
export class RenderReportNeacComponent {

    constructor(
        private reportService: ReportService
    ) {
        this.listReportNEAC()
    }
    public title = 'Số lượng CTS được cấp'
    public configSetting = ConfigSetting

    providerCert: any = []
    totalProviderCert: any = {}
    revokeCert: any = []
    totalRevokeCert: any = {}
    availableCert: any = []
    totalAvailableCert: any = {}
    public data = {
        filters: {
            quarter: 1,
            year: new Date(),
            deviceType: ''
        }
    }

    actionSearch() {
        this.listReportNEAC()

    }

    async listReportNEAC() {
        this.setValueDefault()
        const params = {
            quarter: this.data.filters.quarter || 1,
            year: this.data.filters.year.getFullYear(),
            deviceType: this.data.filters.deviceType || ''
        }
        await this.reportService.listReportNEAC(params).toPromise()
            .then((result: any) => {

                this.availableCert = Object.entries(result?.totalAvailableCert || {}).map(([key, value]) => ({ key, value }))
                this.providerCert = Object.entries(result?.totalProviderCert || {}).map(([key, value]) => ({ key, value }))
                this.revokeCert = Object.entries(result?.totalRevokeCert || {}).map(([key, value]) => ({ key, value }))


                this.totalAvailableCert.ORGANIZATION = this.availableCert.reduce((total: any, item: any) => total + item?.value?.ORGANIZATION || 0, 0)
                this.totalAvailableCert.PERSONAL = this.availableCert.reduce((total: any, item: any) => total + item?.value?.PERSONAL || 0, 0)
                this.totalAvailableCert.STAFF = this.availableCert.reduce((total: any, item: any) => total + item?.value?.STAFF || 0, 0)
                this.totalAvailableCert.ALL = Object.values(this.totalAvailableCert).reduce((total: any, value: any) => total + value, 0)


                this.totalProviderCert.ORGANIZATION = this.providerCert.reduce((total: any, item: any) => total + item?.value?.ORGANIZATION || 0, 0)
                this.totalProviderCert.PERSONAL = this.providerCert.reduce((total: any, item: any) => total + item?.value?.PERSONAL || 0, 0)
                this.totalProviderCert.STAFF = this.providerCert.reduce((total: any, item: any) => total + item?.value?.STAFF || 0, 0)
                this.totalProviderCert.ALL = Object.values(this.totalProviderCert).reduce((total: any, value: any) => total + value, 0)

                this.totalRevokeCert.ORGANIZATION = this.revokeCert.reduce((total: any, item: any) => total + item?.value?.ORGANIZATION || 0, 0)
                this.totalRevokeCert.PERSONAL = this.revokeCert.reduce((total: any, item: any) => total + item?.value?.PERSONAL || 0, 0)
                this.totalRevokeCert.STAFF = this.revokeCert.reduce((total: any, item: any) => total + item?.value?.STAFF || 0, 0)
                this.totalRevokeCert.ALL = Object.values(this.totalRevokeCert).reduce((total: any, value: any) => total + value, 0);


            })
            .catch((err: any) => {
                console.log('err: ', err);

            })
    }

    setValueDefault() {
        this.providerCert = []
        this.totalProviderCert = {}
        this.revokeCert = []
        this.totalRevokeCert = {}
        this.availableCert = []
        this.totalAvailableCert = {}
    }

}
