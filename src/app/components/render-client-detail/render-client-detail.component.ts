import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { result } from 'lodash';
import { CustomerModule } from 'src/app/models/customer/customer.module';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-render-client-detail',
    templateUrl: './render-client-detail.component.html',
    styleUrls: ['./render-client-detail.component.scss']
})
export class RenderClientDetailComponent implements OnInit{

    public title = 'Chi tiết khách hàng'
    public customerId = ''
    public customer: CustomerModule
    public showRepresentative = false
    public dataCertificateCustomer: any = []

    public selectCertIdInfo: any = ''
    public selectCertIdPUK: any = ''
    public PUK: any = ''

    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService
    ) {
        this.customer = new CustomerModule()

    }
    
    async ngOnInit() {
        this.route.queryParams.subscribe(async params => {
            this.customerId = params['id']
            await this.actionCustomerDetail()   
            await this.actionCertificateCustomer()         
        });
        
    }

    async actionCustomerDetail() {
        await this.customerService.detailCustomer(this.customerId).toPromise()
        .then((result: any) => {
            this.customer.setValue(result)
        })
        .catch((err: any) => {
            console.log('err: ', err); 
        })
    }

    async actionCertificateCustomer() {
        await this.customerService.certificateCustomer(this.customerId).toPromise()
        .then((result: any) => {
            this.dataCertificateCustomer = result || []
        })
        .catch((err: any) => {
            console.log('err: ', err);
        })
    }


    

}
