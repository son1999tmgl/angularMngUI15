import { Component } from '@angular/core';
import * as moment from 'moment';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { ReportService } from 'src/app/services/report.service';
import * as Excel from 'exceljs';
import { saveAs } from 'file-saver';



@Component({
    selector: 'app-render-report-cert',
    templateUrl: './render-report-cert.component.html',
    styleUrls: ['./render-report-cert.component.scss']
})
export class RenderReportCertComponent {

    public title = 'Thông tin cert gửi NEAC'
    public configSetting = ConfigSetting
    public headerTable = [
        'STT','Đại lý','Tên khách hàng','ID','Loại giao dịch','Loại khách hàng',
        'Tên gói','Ngày nhập','Ngày cấp','Ngày thu hồi','Trạng thái giao dịch',
        'Ngày gửi NEAC', 'Tình trạng'

    ]
    public data = {
        filters: {
            startDate: '',
            endDate: '',
            sendedToNEAC: 1,
            page: 1,
            perPage: 10,
            total: 0
        }
    }
    public dataListFileNEAC: Array<any> = []

    constructor(
        private reportService: ReportService
    ) {
        this.data.filters.startDate = moment().startOf('month').format('DD/MM/YYYY')
        this.data.filters.endDate = moment().endOf('month').format('DD/MM/YYYY')
        this.listFileNEAC()
    }

    actionSearch() {
        this.listFileNEAC()
    }

    async listFileNEAC() {
        let params = {
            startDate: moment(this.data.filters.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            endDate: moment(this.data.filters.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            sendedToNEAC: this.data.filters.sendedToNEAC,
            page: this.data.filters.page || 1,
            perPage: this.data.filters.perPage || 15
        }
        await this.reportService.listFileNEAC(params).toPromise()
            .then((result: any) => {
                console.log(result);

                if (result.data.length > 0) {
                    this.dataListFileNEAC = this.setValueListFileNEAC(result.data)
                }
                this.data.filters.page = result.page
                this.data.filters.perPage = result.perPage
                this.data.filters.total = result.total

            })
            .catch((err: any) => {
                console.log('err: ', err);

            })
    }

    setValueListFileNEAC(result: any) {
        let temp:any = []
        result.forEach((element: any, index: number) => {
            let requestType: string = ''
            let customerType: string = ''
            let archiveTime: any = ''
            let requestStatus = ''
            if (element?.requestInfo?.requestType) {
                requestType = this.configSetting.ListRequestType[element.requestInfo.requestType].name
                if (element.requestInfo.requestType == 'REVOKE_CERTIFICATE') {
                    archiveTime = element?.certificateInfo?.archiveTime || ''
                }
            }
            if (element?.requestInfo?.customerInfo?.type) {
                customerType = this.configSetting.clientConfig[element.requestInfo.customerInfo.type].name
            }
            if (element?.requestInfo?.status) {
                requestStatus = this.configSetting.requestStatus[element.requestInfo.status].name
            }
            let item = {
                stt: this.showOrder(index),
                agency: element?.requestInfo?.agencyInfo?.name || '',
                customerName: element?.requestInfo?.customerInfo?.info?.commonName || '',
                id: element?.requestInfo?.customerInfo?.info?.identifyNo,
                requestType: requestType,
                customerType: customerType,
                certificateProfileCode: element?.requestInfo?.certificateProfileCode || '',
                createdAt: element?.requestInfo?.createdAt || '',
                validFrom: element?.certificateInfo?.validFrom || '',
                archiveTime: archiveTime,
                requestStatus: requestStatus,
                sendTimeToNEAC: element?.sendTimeToNEAC || '',
                sendedToNEAC: element?.sendedToNEAC ? 'Đã gửi' : 'Chưa gửi'
            }
            temp.push(item)
        });
        return temp

    }

    showOrder(index: any) {
        return (index + 1 + (this.data.filters.page - 1) * this.data.filters.perPage);
    }



    changeFilters(type: string) {

    }

    setValueDefault() {
        // this.data = 
    }

    async exportExcel() {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Thông tin Cert gửi NEAC');

        // header
        worksheet.addRow(this.headerTable).font = { bold: true };


        let params = {
            startDate: moment(this.data.filters.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            endDate: moment(this.data.filters.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            sendedToNEAC: this.data.filters.sendedToNEAC,
            page: 1,
            perPage: 999999
        }
        let data:any = []
        await this.reportService.listFileNEAC(params).toPromise()
            .then((result: any) => {
                if (result.data.length > 0) {
                    data = this.setValueListFileNEAC(result.data)
                }

            })
            .catch((err: any) => {
                console.log('err: ', err);
                
            })

        if(data.length > 0) {
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
        this.listFileNEAC()
    }

}
