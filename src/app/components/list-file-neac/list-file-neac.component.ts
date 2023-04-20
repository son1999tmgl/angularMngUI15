import { Component, OnInit, ViewChild } from '@angular/core';
import { format } from 'date-fns'
import * as moment from 'moment';
import { myFunc } from 'src/app/common/myFunc';
import { Agency } from 'src/app/models/agency';
import { AgencyService } from 'src/app/services/agency.service';
import * as _ from 'lodash';
import { ListFileNeacService } from 'src/app/services/list-file-neac.service';
import { FileNEACModule } from 'src/app/models/file-neac/file-neac.module';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';



@Component({
    selector: 'app-list-file-neac',
    templateUrl: './list-file-neac.component.html',
    styleUrls: ['./list-file-neac.component.scss']
})
export class ListFileNeacComponent implements OnInit {
    @ViewChild(LoadingComponent) public loading: LoadingComponent = new LoadingComponent();

    constructor(
        private agencyService: AgencyService,
        private listFileNeacService: ListFileNeacService
    ) { }

    ngOnInit(): void {
        this.listFileNEAC()
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.listAgency()
            this.listFileNEAC()
        }, 1);
    }

    title = 'Danh sách hồ sơ'

    totalRecord = 0
    params = {
        page: 1,
        perPage: 20,
        orderBy: "updatedAt",
        sortBy: "DESC",
        identifyNo: '',
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().endOf('month').format('YYYY-MM-DD'),
        agencyId: '',
    }
    data = {
        filters: {
            identifyNo: '',
            to: new Date(moment().startOf('month').format('YYYY-MM-DD')),
            from: new Date(moment().endOf('month').format('YYYY-MM-DD')),
            agency: ''
        }
    }

    agencies: Agency[] = [new Agency('--Đại lý--', '')]
    dataListFileNEAC: Array<FileNEACModule> = []



    listAgency() {
        this.loading.show()
        this.agencies = []
        this.agencyService.listAgency().toPromise()
            .then(
                (result: any) => {
                    if (result) {
                        _.forEach(result, (agency) => {
                            if (!myFunc.isEmpty(agency.id) && !myFunc.isEmpty(agency.name)) {
                                this.agencies.push(new Agency(agency.name, agency.id))
                            }
                        })
                    }
                }
            ).catch((err: any) => {
                console.log('err:', err);
            })
            .finally(() => {
                this.loading.hide()
            })
    }

    listFileNEAC() {
        this.loading.show()
        this.listFileNeacService.listFileNEAC(this.params).toPromise()
            .then((result: any) => {
                this.dataListFileNEAC = []
                this.totalRecord = result.total
                for (const item of result.data) {
                    let neac = new FileNEACModule()
                    neac.setValue(item)
                    this.dataListFileNEAC.push(neac)
                }
            })
            .catch((err: any) => {
                console.log('err: ', err);
            })
            .finally(() => this.loading.hide())
    }


    updateRequestToNEAC(requestId: string | number, syncToNEAC: boolean) {
        this.loading.show()
        this.listFileNeacService.updateRequestToNEAC(requestId, syncToNEAC).toPromise()
            .then((result: any) => {
                console.log('result: ', result);
            })
            .catch((err: any) => {
                console.log('err:', err);
            })
            .finally(() => {
                this.loading.hide()
            })
    }


    actionRefresh() {
        this.setParamDefault()
        this.listAgency()
        this.listFileNEAC()
    }

    changeFilters(field: string) {
        this.params.page = 1
        if (field == 'search') {
            this.params.identifyNo = this.data.filters.identifyNo
        } else if (field == 'to') {
            this.params.endDate = format(new Date(this.data.filters.to), 'yyyy-MM-dd');
        } else if (field == 'from') {
            this.params.startDate = format(new Date(this.data.filters.from), 'yyyy-MM-dd');

        } else if (field == 'agency') {
            this.params.agencyId = this.data.filters.agency
        }
    }

    // Phân trang
    paginate(event: any) {
        this.params.page = event.page + 1
        this.params.perPage = event.rows
        this.listFileNEAC()
    }


    actionSearch() {
        console.log('abc');
        console.log(this.params);


        this.listFileNEAC()
    }

    setParamDefault() {
        this.params = {
            page: 1,
            perPage: 20,
            orderBy: "updatedAt",
            sortBy: "DESC",
            identifyNo: '',
            startDate: moment().startOf('month').format('YYYY-MM-DD'),
            endDate: moment().endOf('month').format('YYYY-MM-DD'),
            agencyId: '',
        }
        this.data = {
            filters: {
                identifyNo: '',
                to: new Date(moment().startOf('month').format('YYYY-MM-DD')),
                from: new Date(moment().endOf('month').format('YYYY-MM-DD')),
                agency: ''
            }
        }
    }
}
