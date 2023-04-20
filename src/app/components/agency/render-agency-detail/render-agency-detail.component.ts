import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { AlertService } from 'src/app/common/services/Alert.service';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
    selector: 'app-render-agency-detail',
    templateUrl: './render-agency-detail.component.html',
    styleUrls: ['./render-agency-detail.component.scss']
})
export class RenderAgencyDetailComponent {

    title = 'Chi tiết đại lý'
    deviceInfo: any = {}
    agencyId:string|number = 0;
    dataDetailAgency: any = {}
    configSetting = ConfigSetting
    autoSignMB02: any = {}
    hookInfo: any = {
        hookUrl: '',
        hookUser: '',
        hookPassword: ''
    }
    params = {
        page: 1,
        perPage: 20, 
        freeText: ''
    }
    displayModalToken = false
    constructor(
        private agencyService: AgencyService,
        private route: ActivatedRoute,
        private alertService: AlertService

    ) {
        this.route.queryParams.subscribe(params => {
            this.agencyId = params['id']
        });
        this.actionDetailAgency()
    }



    async actionDetailAgency() {
        
        if (this.agencyId != 0) {
            await this.agencyService.detailAgency(this.agencyId).toPromise()
                .then((result: any) => {
                    this.dataDetailAgency = result || {}
                    this.hookInfo = JSON.parse(this.dataDetailAgency.hookInfo)
                })
                .catch((err: any) => {
                    console.log('err: ', err);
                })
        }

    }

    async actionChangeAccessKeyAgency() {
        if (this.agencyId != 0) {
            await this.agencyService.changeAccessKeyAgency(this.agencyId).toPromise()
                .then((result: any) => {
                    this.actionDetailAgency()
                })
                .catch((err: any) => {
                    console.log('err: ', err);
                })
        }
    }

    openModalToken() {
        this.displayModalToken = true
    }

    actionUpdateAgency() {
        const body = {
            name: this.dataDetailAgency?.name || '',
            taxCode: this.dataDetailAgency?.taxCode || '',
            address: this.dataDetailAgency?.address || '',
            email: this.dataDetailAgency?.email || '',
            phone: this.dataDetailAgency?.phone || '',
            hookUrl: this.hookInfo?.hookUrl || '',
            hookUser: this.hookInfo.hookUser || '',
            hookPassword: this.hookInfo?.hookPassword || '',
            agencyHasTMS: this.dataDetailAgency.agencyHasTMS == true ? 1 : 0,
            autoSignMB02: Object.keys(this.autoSignMB02).filter((key:any) => this.autoSignMB02[key]==true)
        }
        this.agencyService.updateAgency(this.agencyId, body).toPromise()
        .then((result: any) => {
            this.actionDetailAgency()
            this.alertService.showSuccess('Cập nhật thành công.')
        })
        .catch((err: any) => {
            this.alertService.showError('Cập nhật thất bại.')
        })
        
        
        
    }
}

