import { Component, ViewChild } from '@angular/core';
import { myFunc } from 'src/app/common/myFunc';
import { AlertService } from 'src/app/common/services/Alert.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-render-user',
    templateUrl: './render-user.component.html',
    styleUrls: ['./render-user.component.scss']
})
export class RenderUserComponent {
    @ViewChild('closeModalArchiveUser') closeModalArchiveUser:any
    @ViewChild('closeModalResetPasswordUser') closeModalResetPasswordUser:any
    params = {
        page: 1,
        perPage: 20,
        name: '',
        orderBy: 'asc',
        sortBy: 'created_at'
    }
    totalRecord = 0
    title = 'Quản lý người dùng'
    dataListUser:any = []
    displayModal:boolean = false
    selectedUser: any = {}

    constructor( 
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        this.actionListUser()
    }

    paginate(event: any) {
        this.params.page = event.page + 1
        this.params.perPage = event.rows
        this.actionListUser()
    }

    actionListUser() {
        this.accountService.listUser(this.params).toPromise()
        .then((result: any) => {
            this.totalRecord = result.total
            this.dataListUser = result.data
        })
        .catch((err: any) => {
            console.log('err: ', err);
            
        })
    }

    // khoá tài khoản
    actionArchiveUser() {
        console.log(this.selectedUser);
        
        if(!myFunc.isEmpty(this.selectedUser)){
            this.accountService.archiveUser(this.selectedUser.id).toPromise()
            .then(() => {
                this.alertService.showSuccess('Khoá tài khoản thành công.')
                this.closeModalArchiveUser.nativeElement.click()
                this.actionListUser()
            })
            .catch((err: any) => {
                this.alertService.showError('Khoá tài khoản thất bại.')
                console.log('err: ', err);
                
            })
        }
    }

    //reset password
    actionResetPasswordUser() {
        console.log(this.selectedUser);
        
        if(!myFunc.isEmpty(this.selectedUser)){
            this.accountService.resetPasswordUser(this.selectedUser.id).toPromise()
            .then(() => {
                this.alertService.showSuccess('Reset mật khẩu thành công.')
                this.closeModalResetPasswordUser.nativeElement.click()
                this.actionListUser()
            })
            .catch((err: any) => {
                this.alertService.showError('Reset mật khẩu thất bại.')
                console.log('err: ', err);
                
            })
        }
    }

    changeDisplay(event: any) {
        this.displayModal = event
        this.selectedUser = {}
        this.actionListUser()
    }

    openModel(user: any = {}){
        this.displayModal = true
        this.selectedUser = user
    }
}
