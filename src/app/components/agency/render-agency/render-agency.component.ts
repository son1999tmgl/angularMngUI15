import { Component, DoCheck, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { AlertService } from 'src/app/common/services/Alert.service';
import { AgencyService } from 'src/app/services/agency.service';


@Component({
    selector: 'app-render-agency',
    templateUrl: './render-agency.component.html',
    styleUrls: ['./render-agency.component.scss'],
})
export class RenderAgencyComponent{
    @ViewChild(LoadingComponent) loading: LoadingComponent = new LoadingComponent();
    @ViewChild('closeModalEnable') closeModalEnable: any
    @ViewChild('closeModalDisable') closeModalDisable: any

   

    params = {
        page: 1,
        perPage: 20,
        freeText: '',
    }
    totalRecord = 0
    title = 'Tổng đại lý'
    configSetting = ConfigSetting
    dataListAgency: any = []
    selectedAgency: string | number = ''


    displayModalCreate: boolean = false

    paginate(event: any) {
        this.params.page = event.page + 1
        this.params.perPage = event.rows
        this.actionListAgency()
    }


    constructor(
        private agencyService: AgencyService,
        private alertService: AlertService,
    ) {
        this.actionListAgency()
    }
   
    showModalCreate() {
        this.displayModalCreate = true
    }


    async actionListAgency() {
        this.loading.show()
        await this.agencyService.listAgency(this.params).toPromise()
            .then((result: any) => {
                this.dataListAgency = result.data
                this.totalRecord = result.total

            })
            .catch((err: any) => {
                console.log('err: ', err);

            })
            .finally(() => {
                this.loading.hide()
            })
    }

    async actionDisableAgency() {
        this.loading.show()
        await this.agencyService.disableAgency(this.selectedAgency).toPromise()
            .then(async (result: any) => {
                this.alertService.showSuccess('Tạm dừng đại lý thành công.')
                this.closeModalDisable.nativeElement.click()
                await this.actionListAgency()
            })
            .catch((err: any) => {
                console.log('err: ', err);

            })
            .finally(() => {
                this.loading.hide()
            })
    }


    async actionEnableAgency() {
        this.loading.show()
        await this.agencyService.enableAgency(this.selectedAgency).toPromise()
            .then(async (result: any) => {
                this.alertService.showSuccess('Khôi phục đại lý thành công.')
                this.closeModalEnable.nativeElement.click()
                await this.actionListAgency()
            })
            .catch((err: any) => {
                console.log('err: ', err)

            })
            .finally(() => {
                this.loading.hide()
            })
    }

    changeSelectAgency(agencyId: string | number) {
        this.selectedAgency = agencyId
    }

    onDisplayChange(event: any) {
        console.log(123, event);
        
        this.actionListAgency();
    }

    

}
