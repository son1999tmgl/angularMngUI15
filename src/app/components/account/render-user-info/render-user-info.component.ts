import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateBaseComponent } from 'src/app/common/components/template-base/template-base.component';

@Component({
    selector: 'app-render-user-info',
    templateUrl: './render-user-info.component.html',
    styleUrls: ['./render-user-info.component.scss']
})
export class RenderUserInfoComponent extends TemplateBaseComponent {


    @ViewChild('closeModalChangePassword') closeModalChangePassword: any
    public title = 'Thông tin tài khoản'
    public oldPassword = ''
    public newPassword = ''
    public err = {
        newPassword: [],
        oldPassword: []
    }


    override ngAfterViewInit(): void {
        console.log('loading: ', this.loading);
        
    }

    changePassword() {
        this.loading.show()
        this.err.newPassword = []
        this.err.oldPassword = []

        this.accountService.changePassword(this.oldPassword, this.newPassword).toPromise()
            .then((result: any) => {
                this.closeModalChangePassword.nativeElement.click()
                this.alertService.showSuccess('Thay đổi mật khẩu thành công.')
            })
            .catch((err: any) => {
                if (err?.error) {
                    if (err?.error?.oldPassword) {
                        this.err.oldPassword = err?.error?.oldPassword
                    }
                    if (err?.error?.newPassword) {
                        this.err.newPassword = err?.error?.newPassword
                    }
                }
            })
            .finally(() => {
                this.loading.hide()
            })
    }


    updateUser() {
        const params = {
            name: this.userInfo.name || '',
            phone: this.userInfo.phone || ''
        }
        this.loading.show()
        this.accountService.updateUser(params, this.userInfo.id).toPromise()
        .then((result: any) => {
            this.alertService.showSuccess('Cập nhật thành công. ')
            this.processData.userInfo()
            this.loading.hide()
        })
        .catch((err: any) => {
            console.log('err: ', err);
            this.loading.hide()
        })
        .finally(() => {
            this.loading.hide()
        })
    }
}
