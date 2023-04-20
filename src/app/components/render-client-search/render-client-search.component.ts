import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import * as _ from 'lodash';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { CustomerModule } from 'src/app/models/customer/customer.module';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-render-client-search',
    templateUrl: './render-client-search.component.html',
    styleUrls: ['./render-client-search.component.scss']
})
export class RenderClientSearchComponent {
    public title = 'Kết quả tìm kiếm'
    public freeText = ''
    public dataListCustomer: Array<CustomerModule> = []
    public configSetting = ConfigSetting

    constructor(
        private customerService: CustomerService,
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe(params => {
            this.freeText = params['freeText']
        });
        this.actionListCustomer()
    }


    async actionListCustomer() {
        await this.customerService.listCustomer(this.freeText).toPromise()
        .then((result: any) => {
            this.dataListCustomer = []
            if(result.length > 0) {
                _.forEach(result, (item) => {
                    let temp:CustomerModule = new CustomerModule()
                    temp.setValue(item)
                    this.dataListCustomer.push(temp)
                })
                console.log(this.dataListCustomer);
            }
        })
        .catch((err: any) => {
            console.log('err: ', err);
            
        })
    }

}
