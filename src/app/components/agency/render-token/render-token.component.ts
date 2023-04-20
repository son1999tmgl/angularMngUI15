import { Component, Input, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/common/services/Alert.service';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
    selector: 'app-render-token',
    templateUrl: './render-token.component.html',
    styleUrls: ['./render-token.component.scss']
})
export class RenderTokenComponent {
    @ViewChild('closeModalDeleteToken') closeModalDeleteToken: any
    _agencyId: string | number = 0
    @Input()
    set agencyId(value: string|number) {
        if(this.agencyId != 0) {
            this._agencyId = value
            this.actionListToken()
        }
    }
    dataListTokens: any = []
    params = {
        page: 1,
        perPage: 20,
    }
    totalRecord = 0
    selectedTokenId: string | number = 0
    constructor(
        private agencyService: AgencyService,
        private alertService: AlertService
    ) {
        this.actionListToken()
    }

    async actionListToken() {        
        if(this._agencyId != 0) {
            await this.agencyService.listTokenType(this._agencyId, this.params).toPromise()
            .then((result: any) => {
                this.dataListTokens = result.data
                console.log('result: ', result);
                
                this.totalRecord = result.total
            })
            .catch((err: any) => {
                console.log('err: ', err);
            })
        }
    }

    paginate(event: any) {
        this.params.page = event.page + 1
        this.params.perPage = event.rows
        this.actionListToken()
    }

    onDeleteToken(id: string|number) {
        this.selectedTokenId = id
    }

    deleteToken() {
        this.agencyService.deleteTokenType(this.selectedTokenId).toPromise()
        .then((result: any) => {
            this.alertService.showSuccess('Xoá token thành công.')
            this.closeModalDeleteToken.nativeElement.click()
            this.actionListToken()
        })
        .catch((err: any) => {
            this.alertService.showError('Có lỗi xảy ra trong quá trính xử lý.')
            console.log('er: ', err);
            
        })
    }
}
