import { Component } from '@angular/core';
import * as moment from 'moment';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { ReportService } from 'src/app/services/report.service';
import * as Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { myFunc } from 'src/app/common/myFunc';

@Component({
    selector: 'app-render-report-cross',
    templateUrl: './render-report-cross.component.html',
    styleUrls: ['./render-report-cross.component.scss']
})
export class RenderReportCrossComponent {
    public title = 'Đối soát doanh số'
    public configSetting = ConfigSetting
    public headerTable = [
        'STT', 'Đại lý', 'Tên khách hàng', 'MST', 'CMND/ CCCD', 'Loại giao dịch', 'Gói cước',
        'Ngày nhập', 'Ngày cấp CTS', 'Ngày thu hồi', 'Số ngày thu hồi', 'Ngày hết hạn',
        'Thu hồi hoàn tiền'
    ]
    public data = {
        filters: {
            startDate: '',
            endDate: '',
            requestType: '',
            page: 1,
            perPage: 10,
            total: 0
        }
    }
    public dataCrossCheck: Array<any> = []

    constructor(
        private reportService: ReportService
    ) {
        this.data.filters.startDate = moment().startOf('month').format('DD/MM/YYYY')
        this.data.filters.endDate = moment().endOf('month').format('DD/MM/YYYY')
        this.crossCheck()
    }

    actionSearch() {
        this.crossCheck()
    }

    async crossCheck() {
        let params = this.getParamDefault()
        console.log('params: ', params);
        
        await this.reportService.crossCheck(params).toPromise()
            .then((result: any) => {
                console.log('result: result');

                if (result.data.length > 0) {
                    this.dataCrossCheck = this.setValueCrossCheck(result.data)
                }
                console.log('data: ', this.dataCrossCheck);
                
                this.data.filters.page = result.page
                this.data.filters.perPage = result.perPage
                this.data.filters.total = result.total

            })
            .catch((err: any) => {
                console.log('err: ', err);

            })
    }

    setValueCrossCheck(result: any) {
        let temp: any = []
        result.forEach((element: any, index: number) => {
            let requestType: string = ''
            let customerType: string = ''
            let archiveTime: any = ''
            let requestStatus = ''
            let identifyNo = element?.requestInfo?.customerInfo?.info?.identifyNo || ''
            let mst = ''
            let cccd = ''
            let refundForAgency = ''
            console.log('identifyNO: ', identifyNo);
            console.log('--: ', );
            
            

            //mã số thuế, cccd, cmnd
            if(element?.requestInfo?.customerInfo.type == this.configSetting.clientConfig['ORGANIZATION'].code
             || element?.requestInfo?.customerInfo.type == this.configSetting.clientConfig['STAFF'].code
            ){
                mst = identifyNo
            }
            if(element?.requestInfo?.customerInfo.type == this.configSetting.clientConfig['STAFF'].code
               || element?.requestInfo?.customerInfo.type == this.configSetting.clientConfig['PERSONAL'].code
            ){
                cccd = identifyNo
            }

            //loại giao dịch, Ngày revoke
            if (element?.requestInfo?.requestType) {
                requestType = this.configSetting.ListRequestType[element.requestInfo.requestType].name
                if (element.requestInfo.requestType == 'REVOKE_CERTIFICATE') {
                    archiveTime = element?.certificateInfo?.archiveTime || ''
                    if(!myFunc.isEmpty(element?.refundForAgency || '')){
                        refundForAgency = 'Có'
                    }else{
                        refundForAgency = 'Không'
                    }
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
                mst: mst,
                cccd: cccd,
                requestType: requestType,
                certificateProfileCode: element?.requestInfo?.certificateProfileCode || '',
                createdAt: element?.requestInfo?.createdAt || '',
                validFrom: element?.certificateInfo?.validFrom || '',
                archiveTime: archiveTime,
                validTo: element?.certificateInfo?.validTo || '',
                refundForAgency: refundForAgency
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


        let params = this.getParamDefault()
        params.page = 1
        params.perPage = 999999
        let data: any = []
        await this.reportService.crossCheck(params).toPromise()
            .then((result: any) => {
                if (result.data.length > 0) {
                    data = this.setValueCrossCheck(result.data)
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



    getParamDefault() {
        let requestType: any = [this.data.filters.requestType]
        console.log(this.data.filters.requestType);
        
        
        if(myFunc.isEmpty(this.data.filters.requestType)) {
            requestType = []
            this.configSetting.listRequestReport.forEach((type: any) => {
                requestType.push(type.code)
            })
        }
        
        return {
            startDate: moment(this.data.filters.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            endDate: moment(this.data.filters.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            requestType: requestType,
            page: this.data.filters.page,
            perPage: this.data.filters.perPage

        }
    }

    // Phân trang
    paginate(event: any) {
        this.data.filters.page = event.page + 1
        this.data.filters.perPage = event.rows
        this.crossCheck()
    }
}
