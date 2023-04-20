import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeadersService } from '../common/services/HttpHeaders.service';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    constructor(
        private http: HttpClient,
        private httpHeader: HttpHeadersService
    ) {

    }


    listRequest(params: { [param: string]: string | number | boolean | readonly (string | number | boolean)[] }) {
        const httpParams = new HttpParams({ fromObject: params });
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/request/api/v1/requestDevice', { headers: this.httpHeader.headers, params: httpParams });
    }

    createRequestDevices(body: object) {
        console.log('body: ', body);
        this.httpHeader.setAuthorization()
        return this.http.post('/apigate/request/api/v1/requestDevice', body, { headers: this.httpHeader.headers });
    }
}
