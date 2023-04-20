import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeadersService } from '../common/services/HttpHeaders.service';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(
        private http: HttpClient,
        private httpHeader: HttpHeadersService
    ) { }


    listReportNEAC(params: any) {
        this.httpHeader.setAuthorization()
        const httpParams = new HttpParams({ fromObject: params });
        return this.http.get('/apigate/report/api/v1/neac', { headers: this.httpHeader.headers, params: httpParams });
    }

    listFileNEAC(params: any) {
        this.httpHeader.setAuthorization()
        const httpParams = new HttpParams({ fromObject: params });
        return this.http.get('/apigate/report/api/v1/request/syncToNEAC', { headers: this.httpHeader.headers, params: httpParams });
    }

    crossCheck(params: any) {
        this.httpHeader.setAuthorization()
        const httpParams = new HttpParams({ fromObject: params });
        return this.http.get('/apigate/report/api/v1/crossCheck', { headers: this.httpHeader.headers, params: httpParams });
    }

    listReportExpired(params: any) {
        this.httpHeader.setAuthorization()
        const httpParams = new HttpParams({ fromObject: params });
        return this.http.get('/apigate/report/api/v1/expire', { headers: this.httpHeader.headers, params: httpParams });
    }
}
