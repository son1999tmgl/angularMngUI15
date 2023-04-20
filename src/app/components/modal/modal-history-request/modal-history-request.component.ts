import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { myFunc } from 'src/app/common/myFunc';
import { RequestService } from 'src/app/services/request.service';


@Component({
    selector: 'app-modal-history-request',
    templateUrl: './modal-history-request.component.html',
    styleUrls: ['./modal-history-request.component.scss']
})
export class ModalHistoryRequestComponent {


    constructor(
        private requestService: RequestService,
    ) {

    }

    @Input()
    set requestId(value: any) {
        if (!myFunc.isEmpty(value)) {
            this.getRequestLogActivity(value)
        }
    }


    @Output() requestIdChange = new EventEmitter<any>()


    dataHistoriesRequest: any = []


    showLabelActivity(status: string) {
        try {
            return ConfigSetting.requestStatus[status].name
        } catch (error) {
            return ''
        }
    }

    getRequestLogActivity(id: any) {
        this.dataHistoriesRequest = []
        this.requestService.getRequestLogActivity(id).toPromise()
            .then((result: any) => {
                this.dataHistoriesRequest = result                
            })
            .catch((err: any) => {
                console.log('err: ', err);
            })
    }


    actionCloseModal() {
        this.requestIdChange.emit('')
    }


}
