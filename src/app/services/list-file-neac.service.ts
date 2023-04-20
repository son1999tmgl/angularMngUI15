import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeadersService } from '../common/services/HttpHeaders.service';

@Injectable({
    providedIn: 'root'
})
export class ListFileNeacService {

    constructor(
        private http: HttpClient,
        private httpHeader: HttpHeadersService
    ) { }

    listFileNEAC(params: { [param: string]: string | number | boolean | readonly (string | number | boolean)[] }) {
        const httpParams = new HttpParams({ fromObject: params });
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/report/api/v1/request/syncToNEAC', { headers: this.httpHeader.headers, params: httpParams });
    }


    updateRequestToNEAC(requestId: string | number, syncToNEAC: boolean) {
        const body = {
            requestId: requestId || '',
            syncToNEAC: syncToNEAC || false
        }
        this.httpHeader.setAuthorization()
        return this.http.put('/apigate/report/api/v1/request/syncToNEAC', body, { headers: this.httpHeader.headers });
    }

}
