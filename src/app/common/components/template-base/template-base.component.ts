import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { AlertService } from '../../services/Alert.service';
import { AccountService } from '../../../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '../../../services/file.service';
import { tap } from 'rxjs/operators';
import { LoadingComponent } from '../loading/loading.component';
import { myFunc } from '../../myFunc';



@Component({
    selector: 'app-template-base',
    templateUrl: './template-base.component.html',
    styleUrls: ['./template-base.component.scss']
})
export class TemplateBaseComponent implements OnInit, AfterViewInit {
    ngOnInit(): void {
        
    }
    isSale:boolean = false 
    isManager:boolean = false 
    isCensorCa:boolean = false 
    isSuperAdmin:boolean = false 
    showEventUsername = true
    showMenu = true
    showSubMenuDevice = false
    showSubMenuReport = false
    menuList: Array<object> = []
    userInfo: any = {}
    linkActive = ''
    data = {
        filters: {
            freeText: ''
        }
    }
    userRoles:any = []
    @ViewChild(LoadingComponent) loading: LoadingComponent = new LoadingComponent();
    @ViewChild('content_base') content!: ElementRef;
    @ViewChild('middle_base') middle!: ElementRef;
    @ViewChild('header_base') header!: ElementRef;


    // Sự kiện kéo to, thu nhỏ cửa sổ
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        // this.resize()
        if (window.innerWidth < 1100) {
            this.showMenu = false
        } else {
            this.showMenu = true
        }
    }

    resize() {
        if (window.innerWidth < 1100) {
            this.showMenu = false
        } else {
            this.showMenu = true
        }
        if(this.content && this.middle && this.header) {
            setTimeout(() => {
                let width = document.body.scrollWidth.toString() + 'px'
                this.middle.nativeElement.style.width = width
                this.header.nativeElement.style.width = width
                this.content.nativeElement.style.width = width
            }, 10);
            
        }
    }
    constructor(
        protected alertService: AlertService,
        protected accountService: AccountService,
        private router: Router,
        protected fileService: FileService,
        private activatedRoute: ActivatedRoute
    ) {
        this.processData.userInfo()
        this.activatedRoute.url.subscribe(url => {
            this.linkActive = url[0].path
            this.showSubMenuDevice = false
            this.showSubMenuReport = false
            const menuDevice = ['renderDeviceList']
            const menuReport = ['renderReportNEAC','renderReportCert', 'renderReportCross', 'renderReportExpired']
            if(menuDevice.includes(this.linkActive)){
                this.showSubMenuDevice = true
            }else if(menuReport.includes(this.linkActive)){
                this.showSubMenuReport = true
            }
        });
    }

    ngAfterViewInit(): void {
    
    }

    processData = {
        userInfo: () => {
            this.accountService.userInfo()
                .pipe(
                    tap((result: any) => {
                        this.userInfo = result;
                        this.userRoles = result.user_role.map((role:any) => role.role)
                        this.processData.decentralization()
                        localStorage.setItem('userInfo', result);
                        
                    }),
                )
                .subscribe(
                    (result: any) => {
                        // Sau khi chạy tap(), observable sẽ tiếp tục chạy và gọi subscribe()
                        // this.processData.getAvatar();
                    },
                    (error: any) => {
                        console.log('error: ', error);
                    }
                );
        },

        getAvatar: () => {
            if (this.userInfo) {
                this.fileService.getAvatar(this.userInfo.avatar)
                    .subscribe(
                        (result: any) => {
                            // Gắn vào avatar
                            console.log('result: ', result)
                        },
                        (error: any) => {
                            //Lấy ảnh mặc định
                            console.log('error: ', error)
                        }
                    )
            }
        },
        // Phân quyền xem menu
        decentralization: () => {
            this.isSale = false
            this.isCensorCa = false
            this.isManager = false 
            this.isSuperAdmin = false
            if(this.userRoles.includes('sale')){
                this.isSale = true
            }
            if(this.userRoles.includes('manager')){
                this.isManager = true
            }
            if(this.userRoles.includes('censorCa')){
                this.isCensorCa = true
            }
            if(this.userRoles.includes('superAdmin')){
                this.isSuperAdmin = true
            }
        }
    };


    logout() {
        localStorage.clear()
        this.router.navigate(['/login']);
    }


    toggleMenu() {
        console.log('--', this.loading);   
        this.showMenu = !this.showMenu;
    }

    searchCustomer() {
        this.router.navigate(['/renderClientSearch'], { queryParams: { freeText: this.data.filters.freeText } });
        setTimeout(() => {
            window.location.reload()
        }, 10);
    }

}
