import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { myFunc } from 'src/app/common/myFunc';
import { SimService } from 'src/app/services/sim.service';

@Component({
    selector: 'app-render-sim-provisioning-management',
    templateUrl: './render-sim-provisioning-management.component.html',
    styleUrls: ['./render-sim-provisioning-management.component.scss']
})
export class RenderSimProvisioningManagementComponent implements OnInit {
    async ngOnInit() {
        await this.actionListSim()
    }

    @ViewChild(LoadingComponent) loading: LoadingComponent = new LoadingComponent();
    @ViewChild('closeModalDeleteSim') closeModalDeleteSim: any
    constructor(
        private simService: SimService
    ) {

    }
    public title = 'Danh sách sim'
    totalRecord = 0
    params = {
        page: 1,
        perPage: 20,
        freeText: '',
        status: ''
    }
    public configSetting = ConfigSetting
    public listSim:any = []
    public simDeleteId: string = ''
    public showModalImportSim:boolean = false




    async actionListSim() {
        if(this.params.status == null){
            this.params.status = ''
        }
        this.loading.show()
        this.listSim = []
        await this.simService.listSim(this.params).toPromise()
        .then((result: any) => {
            _.forEach(result.data, (item: any) => {
                this.listSim.push(item)
            })
            this.totalRecord = result?.total || 0
        })
        .catch((err: any) =>{
            console.log('err: ', err);
        })
        .finally(() => {
            this.loading.hide()
        })
    }

    paginate(event: any) {
        this.params.page = event.page + 1
        this.params.perPage = event.rows
        this.actionListSim()
    }

    deleteSim() {
        this.simService.deleteSim(this.simDeleteId).toPromise()
        .then((result: any) => {
            this.closeModalDeleteSim.nativeElement.click()
            this.actionListSim()
        })
        .catch((err: any) => {
            console.log('err: ', err);
            
        })
    }

    onDeleteSim(simId: string ) {
        this.simDeleteId = simId
    }

    
}
