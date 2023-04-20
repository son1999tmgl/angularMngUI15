import { Component } from '@angular/core';
import * as Excel from 'exceljs';
import { saveAs } from 'file-saver';
import * as _ from 'lodash';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { myFunc } from 'src/app/common/myFunc';
import { Agency } from 'src/app/models/agency';
import { AgencyService } from 'src/app/services/agency.service';
import { ReportService } from 'src/app/services/report.service';
import { format } from 'date-fns'


@Component({
    selector: 'app-render-report-expired',
    templateUrl: './render-report-expired.component.html',
    styleUrls: ['./render-report-expired.component.scss']
})
export class RenderReportExpiredComponent {
    public title = 'Báo cáo hết hạn'
    public configSetting = ConfigSetting
    public agencies: Agency[] = [new Agency('--Đại lý--', '')]
    public listCertExpire = [
        {name: '--Chọn thời gian chứng thư hết hạn--', code: ''},
        {name: '1 tháng', code: 1},
        {name: '2 tháng', code: 2},
        {name: '3 tháng', code: 3} 
    ]
    public headerTable = [
        'STT', 'Đại lý', 'MST', 'CMND/ CCCD', 'Tên khách hàng', 'Loại khách hàng',
        'Ngày cấp chứng thư', 'Ngày hết hạn', 'Số điện thoại', 'Email', 'Thiết bị',
        'SĐT cấp chứng thư số'

    ]
    public data = {
        filters: {
            page: 1,
            perPage: 10,
            total: 0,
            agencyId: '',
            certExpireIn: 3
        }
    }
    public dataListReportExpired: Array<any> = []

    constructor(
        private reportService: ReportService,
        private agencyService: AgencyService,
        // private datePipe: DatePipe
    ) {
        this.listReportExpired()
        this.listAgency()
    }

    actionSearch() {
        this.listReportExpired()
    }

    async listReportExpired() {  
        this.dataListReportExpired = []      
        let params = this.getParams()
        await this.reportService.listReportExpired(params).toPromise()
            .then((result: any) => {
                if (result.data.length > 0) {
                    this.dataListReportExpired = this.setValueListReportExpired(result.data)
                }
                this.data.filters.page = result.page
                this.data.filters.perPage = result.perPage
                this.data.filters.total = result.total

            })
            .catch((err: any) => {
                console.log('err: ', err);
            })
    }

    setValueListReportExpired(result: any) {
        let temp: any = []
        result.forEach((element: any, index: number) => {
            let customerType: string = ''
            let requestStatus = ''
            let identifyNo = element?.requestInfo?.requestInfo?.customerInfo?.info?.identifyNo || ''
            let mst = ''
            let cccd = ''
            let simInfo = ''
            let deviceType = ''
            //mã số thuế, cccd, cmnd
            if(element?.requestInfo?.requestInfo?.customerInfo?.type == this.configSetting.clientConfig['ORGANIZATION'].code
             || element?.requestInfo?.requestInfo?.customerInfo?.type == this.configSetting.clientConfig['STAFF'].code
            ){
                mst = identifyNo
            }
            if(element?.requestInfo?.requestInfo?.customerInfo?.type == this.configSetting.clientConfig['STAFF'].code
               || element?.requestInfo?.requestInfo?.customerInfo?.type == this.configSetting.clientConfig['PERSONAL'].code
            ){
                cccd = identifyNo
            }

            //Loại khách hàng
            if (element?.requestInfo?.requestInfo?.customerInfo?.type) {
                customerType = this.configSetting.clientConfig[element.requestInfo.requestInfo.customerInfo.type].name
            }
            if (element?.requestInfo?.requestInfo?.status) {
                requestStatus = this.configSetting.requestStatus[element.requestInfo.requestInfo.status].name
            }

            if(element?.requestInfo?.requestInfo?.deviceType){
                deviceType = element.requestInfo.requestInfo.deviceType
                if(deviceType == 'SIM'){
                    simInfo =  element.requestInfo.requestInfo?.requestData?.simInfo?.phone || ''
                }
            }

            // Số điện thoại cấp cts

            let item = {
                stt: this.showOrder(index),
                agency: element?.requestInfo?.requestInfo?.agencyInfo?.name || '',
                mst: mst,
                cccd: cccd,
                customerName: element?.requestInfo?.requestInfo?.customerInfo?.info?.commonName || '',
                customerType: customerType,
                validFrom:  format(new Date(element?.validFrom || ''), 'dd-MM-yyyy'),
                validTo: format(new Date(element?.validTo || ''), 'dd-MM-yyyy'),
                phone: element?.requestInfo?.requestInfo?.customerInfo?.info?.phone || '',
                email: element?.requestInfo?.requestInfo?.customerInfo?.info?.email || '',
                deviceType: element?.requestInfo?.requestInfo?.deviceType || '',
                simInfo: simInfo
            }
            temp.push(item)
        });
        return temp

    }

    showOrder(index: any) {
        return (index + 1 + (this.data.filters.page - 1) * this.data.filters.perPage);
    }



    async exportExcel() {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Thông tin Cert gửi NEAC');

        // header
        worksheet.addRow(this.headerTable).font = { bold: true };


        let params = {
            page: 1,
            perPage: 999999
        }
        let data: any = []
        await this.reportService.listReportExpired(params).toPromise()
            .then((result: any) => {
                if (result.data.length > 0) {
                    data = this.setValueListReportExpired(result.data)
                }

            })
            .catch((err: any) => {
                console.log('err: ', err);

            })

        if (data.length > 0) {
            data.forEach((row: any) => {
                worksheet.addRow(Object.values(row))
            })
            await workbook.xlsx.writeBuffer().then(data => {
                const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                saveAs(blob, this.title + '.xlsx');
            });
        }


    }

    // Phân trang
    paginate(event: any) {
        this.data.filters.page = event.page + 1
        this.data.filters.perPage = event.rows
        this.listReportExpired()
    }

    listAgency() {
        this.agencyService.listAgency()
            .subscribe(
                (result: any) => {
                    if (result) {
                        _.forEach(result, (agency) => {
                            if (!myFunc.isEmpty(agency.id) && !myFunc.isEmpty(agency.name)) {
                                this.agencies.push(new Agency(agency.name, agency.id))
                            }
                        })
                    }

                },
                (err: any) => {
                    console.log('err:', err);
                }
            )
    }



    getParams(){
        return  {
            page: this.data.filters.page || 1,
            perPage: this.data.filters.perPage || 15,
            certExpireIn: this.data.filters.certExpireIn || 3,
            agencyId: this.data.filters.agencyId || ''
        }   
    }
}
