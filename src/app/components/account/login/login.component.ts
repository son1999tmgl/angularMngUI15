import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../common/services/Alert.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../../services/account.service';
import { HttpHeadersService } from '../../../common/services/HttpHeaders.service';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
    constructor(
        private alertService: AlertService,
        private accountService: AccountService,
        private router: Router,
        private httpHeader: HttpHeadersService
    ) {

    }

    @ViewChild(LoadingComponent) loading: LoadingComponent = new LoadingComponent();


    account = {
        username: '',
        password: ''
    }
    userRole = []


    ngOnInit(): void {
    }


    login(): void {
        if (this.account.username == '' || this.account.password == '') {
            this.alertService.showError('Tên đăng nhập và mật khẩu không được để trống.')
        } else {
            this.loading.show()
            this.accountService.login(this.account.username, this.account.password)
                .subscribe(
                    (result: any) => {
                        // Nếu gọi API thành công, chuyển đến trang /renderListRequest

                        this.httpHeader.setAuthorization()
                        localStorage.setItem("accessToken", result.access_token);
                        this.userInfo()
                        this.loading.hide();
                    },
                    (error) => {
                        // Nếu gọi API không thành công, hiển thị thông báo lỗi
                        this.alertService.showWarning('Tên đăng nhập hoặc mật khẩu sai.')
                        this.loading.hide();
                        console.error(error);
                    })
        }
    }


    async userInfo() {

        await this.accountService.userInfo().toPromise()
        .then((result: any) => {
            const roles = result.user_role.map((role: any) => role.role)
            if(roles.includes('censorCa')){
                this.router.navigate(['/renderListRequest']);
            }else if(roles.includes('superAdmin')){
                this.router.navigate(['/renderSimProvisioningManagement']);
            }else if(roles.includes('sale')){
                this.router.navigate(['/renderReportExpired']);
            }else if(roles.includes('manager')){
                this.router.navigate(['/renderReportNEAC']);
            }
        })
        .catch((err: any) => {
            console.log('err: ', err); 
        })
    }



}
