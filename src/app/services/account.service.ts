import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpHeadersService } from '../common/services/HttpHeaders.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root',
    deps: [HttpHeadersService]
})
export class AccountService {

    constructor(private http: HttpClient,
        private httpHeader: HttpHeadersService
    ) {

    }

    login(userName: string, password: string) {
        this.httpHeader.setAuthorization()
        const body = {
            username: userName,
            password: password,
            grant_type: 'password',
            client_id: environment.oauth.clientID,
            client_secret: environment.oauth.clientSecret,
            scope: ''
        }
        return this.http.post('/api/oauth/token', body, { headers: this.httpHeader.headers });
    }


    userInfo() {
        this.httpHeader.setAuthorization()
        return this.http.get('/api/api/v1/userInfo', { headers: this.httpHeader.headers });
    }

    //ds người dùng
    listUser(params: any) {
        const httpParams = new HttpParams({ fromObject: params });
        this.httpHeader.setAuthorization()
        return this.http.get('/api/api/v1/user', { headers: this.httpHeader.headers, params: httpParams });
    }

    createUser(body: any) {
        this.httpHeader.setAuthorization()
        return this.http.post('/api/api/v1/user', body, { headers: this.httpHeader.headers });
    }

    //khoá/xoá tài khoản
    archiveUser(id: number | string) {
        this.httpHeader.setAuthorization()
        return this.http.delete('/api/api/v1/user/' + id, { headers: this.httpHeader.headers });
    }


    //reset pasword
    resetPasswordUser(id: number | string) {
        this.httpHeader.setAuthorization()
        return this.http.put('/api/api/v1/user/password/reset/' + id, [], { headers: this.httpHeader.headers });
    }


    changePassword(oldPassword: string, newPassword: string) {
        this.httpHeader.setAuthorization()
        const body = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        return this.http.put('/api/api/v1/user/password', body, { headers: this.httpHeader.headers });
    }


    updateUser(param: any, userId: string | number) {
        this.httpHeader.setAuthorization()
        const body = {
            name: param?.name || '',
            phone: param?.phone || ' ',
            role: param?.role || []
        }
        return this.http.put('/api/api/v1/user/' + userId, body, { headers: this.httpHeader.headers });
    }
}
