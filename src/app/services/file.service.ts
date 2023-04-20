import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private headers = new HttpHeaders();

    constructor(private http: HttpClient) { }

    getAvatar(path: string) {
        const user = 'my-user';
        const password = 'my-password';
        this.headers = this.headers.set(
            'Authorization',
            'Basic ' + btoa(user + ':' + password)
        );

        const params = new HttpParams().set('path', path).set('size', '200');
        return this.http.get('/fileApi/api/v1/image/thumbnail', {
            headers: this.headers,
            params,
        });
    }

    getFileLicense(path: string) {
        const user = 'newtel';
        const password = 'newtel123';
        this.headers = this.headers.set(
            'Authorization',
            'Basic ' + btoa(user + ':' + password)
        );

        const params = new HttpParams().set('path', path);
        return this.http.get('/fileApi/api/v1/file', {
            headers: this.headers,
            params,
        });
    }
}
