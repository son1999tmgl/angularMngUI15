import { Component, EventEmitter, Input, Output } from '@angular/core';
import { myFunc } from 'src/app/common/myFunc';
import { AlertService } from 'src/app/common/services/Alert.service';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
    selector: 'app-create-token',
    templateUrl: './create-token.component.html',
    styleUrls: ['./create-token.component.scss']
})
export class CreateTokenComponent {
    @Input() display: boolean = false
    @Input() agencyId: string | number = ''
    @Output() displayChange = new EventEmitter<boolean>()

    err: any = {}
    token: any = {}

    constructor(
        private agencyService: AgencyService,
        private alertService: AlertService
    ) {

    }

    closeModal() {
        this.display = false
        this.displayChange.emit(false)
    }


    actionCreateToken() {
        console.log(123);
        console.log(this.agencyId);
        
        if (!myFunc.isEmpty(this.agencyId)) {            
            const body = {
                agencyId: this.agencyId,
                name: this.token.name || '',
                code: this.token?.code || ''
            }
            this.agencyService.createToken(body).toPromise()
                .then((result: any) => {
                    this.alertService.showSuccess('Thêm mới token thành công.')
                    this.display = false
                    this.displayChange.emit(false)
                })
                .catch((err: any) => {
                    this.alertService.showError('Thêm mới token thất bại.')
                    console.log('err: ', err);
                })
        }
    }

}
