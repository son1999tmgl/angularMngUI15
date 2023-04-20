import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeadersService } from '../common/services/HttpHeaders.service';
import { myFunc } from '../common/myFunc';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(
        private http: HttpClient,
        private httpHeader: HttpHeadersService
    ) {

    }


    listRequest(params: { [param: string]: string | number | boolean | readonly (string | number | boolean)[] }) {
        const httpParams = new HttpParams({ fromObject: params });
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/request/api/v1/request', { headers: this.httpHeader.headers, params: httpParams });
    }

    requestInfo(id: string) {
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/request/api/v1/request/'+id, { headers: this.httpHeader.headers });
    }

    getRequestLogActivity(id: any) {
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/request/api/v1/request/log/activity/'+id, { headers: this.httpHeader.headers });
    }

    getCertificateInfoBySerialNumber(id: any) {
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/request/api/v1/certificate/'+id, { headers: this.httpHeader.headers });
    }

    archiveRequest(id: string, reason: string = '') {
        console.log('id: ', id);
        console.log('reason: ', reason);
        
        
        this.httpHeader.setAuthorization()
        if(!myFunc.isEmpty(id)){
            return this.http.delete('/apigate/request/api/v1/request/'+id+'?reason='+reason, { headers: this.httpHeader.headers });
        }
        return
    }


    rejectRequest(id: string, reason: string = '') {
        this.httpHeader.setAuthorization()
        if(!myFunc.isEmpty(id)){
            return this.http.put('/apigate/request/api/v1/request/reject/'+id, {'reason': reason},  { headers: this.httpHeader.headers });
        }
        return
    }


    approvalRequest(id: string, body: any) {
        this.httpHeader.setAuthorization()
        if(!myFunc.isEmpty(id)){
            return this.http.put('/apigate/request/api/v1/request/approval/'+id, body,  { headers: this.httpHeader.headers });
        }
        return
    }







}
