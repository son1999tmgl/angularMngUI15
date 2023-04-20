import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeadersService } from '../common/services/HttpHeaders.service';

@Injectable({
    providedIn: 'root'
})
export class SimService {

    constructor(
        private http: HttpClient,
        private httpHeader: HttpHeadersService
    ) { }


    listSim(params: { [param: string]: string | number | boolean | readonly (string | number | boolean)[] }) {
        const httpParams = new HttpParams({ fromObject: params });
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/sim/api/v1/sim', { headers: this.httpHeader.headers, params: httpParams });
    }

    deleteSim(id: string) {
        this.httpHeader.setAuthorization()
        return this.http.delete('/apigate/sim/api/v1/sim/'+id, { headers: this.httpHeader.headers });
    }

    insertSim(body: any) {
        this.httpHeader.setAuthorization()
        return this.http.post('/apigate/sim/api/v1/sim', body, { headers: this.httpHeader.headers });
    }
}
