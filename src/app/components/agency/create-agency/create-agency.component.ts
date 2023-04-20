import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from 'src/app/common/services/Alert.service';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
    selector: 'app-create-agency',
    templateUrl: './create-agency.component.html',
    styleUrls: ['./create-agency.component.scss']
})
export class CreateAgencyComponent {
    @Input() display: boolean = false
    @Output() displayChange = new EventEmitter<boolean>();
    agency: any = {}
    err: any = {}

    constructor(
        private agencyService: AgencyService,
        private alertService: AlertService
    ) {

    }

    async actionCreateAgency() {
        let body:any = {
            name: this.agency.name,
            taxCode: this.agency.taxCode,
            address: this.agency.address,
            email: this.agency.email,
            phone: this.agency.phone
        }
        if(this.agency.agencyHasTMS == true){
            body.agencyHasTMS = 1
        }else{
            body.agencyHasTMS = 0
        }

        if(this.agency.hookUrl == ''){
            body.hookUrl = null
        }
        if(this.agency.hookUser == ''){
            body.hookUser = null
        }
        if(this.agency.hookPassword == ''){
            body.hookPassword = null
        }        

        
        await this.agencyService.createAgency(body).toPromise()
        .then((result: any) => {
            this.display = false
            this.displayChange.emit(false)
            this.alertService.showSuccess('Thêm mới thành công.')
        })
        .catch((err: any) => {
            console.log('err: ', err);
            this.alertService.showError('Có lỗi xảy ra.')
        })
    }
    closeModal() {
        this.display = false
        this.displayChange.emit(false)
    }

}
