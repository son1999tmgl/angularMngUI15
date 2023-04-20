import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private toast: ToastrService) { }

  showSuccess(message: string, title: string = '', option: object = {}) {
    return this.toast.success(message, title, option);
  }

  showError(message: string, title: string = '', option: object = {}) {
    this.toast.error(message, title, option);
  }

  showInfo(message: string, title: string = '', option: object = {}) {
    this.toast.info(message, title, option);
  }

  showWarning(message: string, title: string = '', option: object = {}) {
    console.log('123');
    
    this.toast.warning(message, title, option);
  }

}
