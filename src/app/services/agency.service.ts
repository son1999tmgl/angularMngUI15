import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeadersService } from '../common/services/HttpHeaders.service';

@Injectable({
    providedIn: 'root'
})
export class AgencyService {

    constructor(
        private http: HttpClient,
        private httpHeader: HttpHeadersService
    ) { }


    listAgency(parmas: any = {}) {
        let params = {
            freeText: '',
            page: 1,
            perPage: 99999,
            ...parmas
        }
        const httpParams = new HttpParams({ fromObject: params });
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/agency/api/v1/agency', { headers: this.httpHeader.headers, params: httpParams });
    }
    
    detailAgency(agencyId: string | number) {
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/agency/api/v1/agency/'+agencyId, { headers: this.httpHeader.headers });
    }

    changeAccessKeyAgency(agencyId: string | number) {
        this.httpHeader.setAuthorization()
        return this.http.put('/apigate/agency/api/v1/agency/accesskey/'+agencyId, [], { headers: this.httpHeader.headers });
    }

    createAgency(body: any) {
        this.httpHeader.setAuthorization()
        return this.http.post('/apigate/agency/api/v1/agency',body, { headers: this.httpHeader.headers });
    }

    updateAgency(agencyId:string|number, body: any) {
        this.httpHeader.setAuthorization()
        return this.http.put('/apigate/agency/api/v1/agency/' + agencyId, body, { headers: this.httpHeader.headers });
    }

    disableAgency(agencyId: string | number) {
        const accessToken = localStorage.getItem('accessToken')
        this.httpHeader.headers.set('Authorization', `Bearer ${accessToken}`);
        return this.http.delete('/apigate/agency/api/v1/agency/disable/' + agencyId, { headers: this.httpHeader.headers });
    }

    enableAgency(agencyId: string | number) {
        const accessToken = localStorage.getItem('accessToken')
        this.httpHeader.headers.set('Authorization', `Bearer ${accessToken}`);
        return this.http.post('/apigate/agency/api/v1/agency/enable/' + agencyId, [],{ headers: this.httpHeader.headers });
    }

    listTokenType(customerId: string|number, params: any) {
        const httpParams = new HttpParams({ fromObject: params });
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/agency/api/v1/tokenType/' + customerId, { headers: this.httpHeader.headers, params: httpParams });
    }

    listCertificateProfile(customerId: string|number, params: any) {
        const httpParams = new HttpParams({ fromObject: params });
        this.httpHeader.setAuthorization()
        return this.http.get('/apigate/agency/api/v1/certificateProfile/' + customerId, { headers: this.httpHeader.headers, params: httpParams });
    }

    
    createCertificateProfile(body: any) {
        this.httpHeader.setAuthorization()
        return this.http.post('/apigate/agency/api/v1/certificateProfile', body, { headers: this.httpHeader.headers });
    }

    // Cập nhật chứng thư 
    updateCertificateProfile(body: any, id: string|number) {
        this.httpHeader.setAuthorization()
        return this.http.put('/apigate/agency/api/v1/certificateProfile/'+id, body, { headers: this.httpHeader.headers });
    }

    // công khai chứng thư
    publishCertificateProfile(id: any) {
        this.httpHeader.setAuthorization()
        return this.http.post('/apigate/agency/api/v1/certificateProfile/publish/' + id, [], { headers: this.httpHeader.headers });
    }

    // lưu trữ chứng thư
    archiveCertificateProfile(id: any) {
        this.httpHeader.setAuthorization()
        return this.http.post('/apigate/agency/api/v1/certificateProfile/archive/' + id, [], { headers: this.httpHeader.headers });
    }

    deleteTokenType(tokenId: string|number) {
        this.httpHeader.setAuthorization()
        return this.http.delete('/apigate/agency/api/v1/tokenType/delete/' + tokenId, { headers: this.httpHeader.headers });
    }

    deleteCertificateProfile(tokenId: string|number) {
        this.httpHeader.setAuthorization()
        return this.http.delete('/apigate/agency/api/v1/certificateProfile/delete/' + tokenId, { headers: this.httpHeader.headers });
    }

    createToken(body: any){
        this.httpHeader.setAuthorization()
        return this.http.post('/apigate/agency/api/v1/tokenType', body, { headers: this.httpHeader.headers });
    }
}
