import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeadersService } from '../common/services/HttpHeaders.service';

@Injectable({
    providedIn: 'root',
    deps: [HttpHeadersService]
})
export class CustomerService {

    constructor(
        private http: HttpClient,
        private httpHeader: HttpHeadersService
    ) { }


    searchCustomer(freeText: string = '') {
        // const httpParams = new HttpParams({ fromObject: params });
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/customer/api/v1/customer?freeText=' + freeText, { headers: this.httpHeader.headers });
    }

    listCustomer(freeText: string = '') {
        this.httpHeader.setAuthorization()
        return this.http.put('/apigate/customer/api/v1/customer', { indentifyNo: freeText }, { headers: this.httpHeader.headers });
    }

    detailCustomer(id: number | string) {
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/customer/api/v1/customer/' + id, { headers: this.httpHeader.headers });
    }

    certificateCustomer(id: number | string) {
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/customer/api/v1/customer/certificate/' + id, { headers: this.httpHeader.headers });
    }


    updatePUK(certId: string, puk: string) {
        this.httpHeader.setAuthorization()
        let body = {
            'certSN': certId,
            'PUK': puk
        }
        return this.http.put('/apigate/customer/api/v1/device/puk/', body, { headers: this.httpHeader.headers });
    }

    ListCustomerDevice(params: any) {
        const accessToken = localStorage.getItem('accessToken')
        this.httpHeader.headers.set('Authorization', `Bearer ${accessToken}`);
        return this.http.put('/apigate/customer/api/v1/customerDevice', params, { headers: this.httpHeader.headers });
    }





}
