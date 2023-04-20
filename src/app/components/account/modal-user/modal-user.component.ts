import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { myFunc } from 'src/app/common/myFunc';
import { AlertService } from 'src/app/common/services/Alert.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-modal-user',
    templateUrl: './modal-user.component.html',
    styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent {
    @Input() display: boolean = false
    _userId: number | string = ''
    @Input()
    set user(value: any) {
        console.log(value);        
        if (!myFunc.isEmpty(value)) {
            this._userId = value.id
            this.title = 'Chỉnh sửa người dùng'
            this.dataUser = value
            this.arrRole = value.user_role.reduce((result: any, role: any)=>{
                result[role.role] = true
                return result
            }, {})
            console.log(this.arrRole);
        } else {
            this._userId = ''
            this.title = 'Thêm mới người dùng'
            this.dataUser = {}
            this.arrRole = {}
            
        }
    }
    @Output() changeDisplay = new EventEmitter<boolean>()
    title = ''
    err: any = {}
    value: any = {}
    dataUser: any = {}
    // ds tất cả role
    listRole: any = ConfigSetting.listRoles
    // ds role của người dùng
    arrRole: any = {}

    constructor(
        private accountService: AccountService,
        private alertService: AlertService
    ) {

    }
    closeModal() {
        this.display = false
        this.changeDisplay.emit(false)
    }

    actionCreateUser() {
        if (myFunc.isEmpty(this._userId)) {
            const body = this.actionGetBody()
            this.accountService.createUser(body).toPromise()
                .then((result: any) => {
                    this.alertService.showSuccess('Tạo tài khoản thành công.')
                    this.display = true
                    this.changeDisplay.emit(false)
                })
                .catch((err: any) => {
                    this.alertService.showError('Tạo tài khoản thất bại.')
                    console.log('er: ', err);

                })
        }
    }


    actionUpdateUser() {
        if (!myFunc.isEmpty(this._userId)) {
            const body = this.actionGetBody()
            console.log('body: ', body);
            
            this.accountService.updateUser(body, this._userId).toPromise()
                .then((result: any) => {
                    this.alertService.showSuccess('Cập nhật khoản thành công.')
                    this.display = true
                    this.changeDisplay.emit(false)
                })
                .catch((err: any) => {
                    this.alertService.showError('Cập nhật khoản thất bại.')
                    console.log('er: ', err);

                })
        }
    }

    actionGetBody() {
        return {
            phone: this.dataUser?.phone || '',
            name: this.dataUser?.name || '',
            email: this.dataUser?.email || '',
            role: Object.keys(this.arrRole).filter(key => this.arrRole[key] == true)
        }
    }

}
