import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { format } from 'date-fns';
import * as _ from 'lodash';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { myFunc } from 'src/app/common/myFunc';
import { Agency } from 'src/app/models/agency';
import { RequestModule } from 'src/app/models/request/request.module';
import { AgencyService } from 'src/app/services/agency.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
    selector: 'app-list-request-content',
    templateUrl: './list-request-content.component.html',
    styleUrls: ['./list-request-content.component.scss']
})
export class ListRequestContentComponent implements OnInit {

    @Input()
    set customerId(value: string) {
        if (!myFunc.isEmpty(value)) {
            this.params.customerId = value
        }
    }
    @ViewChild(LoadingComponent, { static: false }) loadingComponent: LoadingComponent;
    constructor(
        private requestService: RequestService,
        private agencyService: AgencyService,
        private router: Router

    ) {
        this.loadingComponent = new LoadingComponent();
        this.status = ConfigSetting.requestStatusConfig
        this.deviceType = ConfigSetting.listDevices
        this.requestType = ConfigSetting.requestTypeConfig
    }

    selectRequestId: any = ''
    dataRequestHistory: any = []
    deviceType: any
    requestType: any
    status: any
    totalRecord = 0
    params = {
        page: 1,
        perPage: 20,
        orderBy: "updatedAt",
        sortBy: "DESC",
        freeText: '',
        beginDate: '',
        endDate: '',
        agencyId: '',
        status: '',
        customerId: '',
        deviceType: '',
        requestType: ''
    }
    data = {
        filters: {
            search: '',
            to: '',
            from: '',
            status: '',
            agency: '',

        }
    }
    dataListRequest: Array<RequestModule> = [];

    agencies: Agency[] = [new Agency('--Đại lý--', '')]

    ngOnInit(): void {
        this.listRequest()
        this.listAgency()
    }



    // Lấy danh sách yêu cầu khách hàng
    listRequest() {
        this.requestService.listRequest(this.params)
            .subscribe(
                (result: any) => {
                    this.dataListRequest = []
                    this.totalRecord = result.total
                    for (const item of result.data) {
                        let req = new RequestModule()
                        req.setValue(item)
                        this.dataListRequest.push(req)
                    }
                },
                (error: any) => {
                    console.log('error: ', error);
                }
            )
    }

    // Phân trang
    paginate(event: any) {
        this.params.page = event.page + 1
        this.params.perPage = event.rows
        this.listRequest()
    }


    detailRequest(id: any) {
        const navigationExtras: NavigationExtras = {
            queryParams: { id: id }
          };
        this.router.navigate(['/renderDetailRequest'], navigationExtras);
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

    actionSearch() {
        this.listRequest()
    }

    actionRefresh() {
        this.listAgency()
    }

    changeFilters(field: string) {
        this.params.page = 1
        if (field == 'search') {
            this.params.freeText = this.data.filters.search || ''
        } else if (field == 'to') {
            this.params.endDate = format(new Date(this.data.filters.to), 'yyyy-MM-dd') || '';
        } else if (field == 'from') {
            this.params.beginDate = format(new Date(this.data.filters.from), 'yyyy-MM-dd') || '';

        } else if (field == 'status') {
            this.params.status = this.data.filters.status || ''
        } else if (field == 'agency') {
            this.params.agencyId = this.data.filters.agency || ''
        }
    }
    

}
