import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// common components
import { LoadingComponent } from './common/components/loading/loading.component';
import { TemplateBaseComponent } from './common/components/template-base/template-base.component';
import { LoginComponent } from './components/account/login/login.component';


// services
import { ToastrModule } from 'ngx-toastr';
import { HttpHeadersService } from './common/services/HttpHeaders.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ListRequestComponent } from './components/request/list-request/list-request.component';
import { ListFileNeacComponent } from './components/list-file-neac/list-file-neac.component';


// datepicker
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';

// materia
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';

// primeNG
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { DatePipe } from './pipes/date.pipe';
import {PaginatorModule} from 'primeng/paginator';
import { RenderDeviceListComponent } from './components/device/render-device-list/render-device-list.component';
import { RenderDeviceInsertTokenLockUnLockComponent } from './components/device/render-device-insert-token-lock-un-lock/render-device-insert-token-lock-un-lock.component';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {ImageModule} from 'primeng/image';
import {ScrollTopModule} from 'primeng/scrolltop';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {ProgressBarModule} from 'primeng/progressbar';








//directives
import { PrimeDropDownDirective } from './common/directives/prime-drop-down.directive';


// pdf
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MyImageComponent } from './common/components/my-image/my-image.component';
import { DetailRequestComponent } from './components/request/detail-request/detail-request.component';
import { ModalBaseComponent } from './components/modal/modal-base/modal-base.component';
import { RenderReportNeacComponent } from './components/report/render-report-neac/render-report-neac.component';
import { RenderReportCertComponent } from './components/report/render-report-cert/render-report-cert.component';
import { RenderReportCrossComponent } from './components/report/render-report-cross/render-report-cross.component';
import { RenderReportExpiredComponent } from './components/report/render-report-expired/render-report-expired.component';
import { RenderClientSearchComponent } from './components/render-client-search/render-client-search.component';
import { RenderClientDetailComponent } from './components/render-client-detail/render-client-detail.component';
import { ListRequestContentComponent } from './components/request/list-request-content/list-request-content.component';
import { RenderDeviceListContentComponent } from './components/device/render-device-list-content/render-device-list-content.component';
import { RenderUserInfoComponent } from './components/account/render-user-info/render-user-info.component';
import { RenderSimProvisioningManagementComponent } from './components/render-sim-provisioning-management/render-sim-provisioning-management.component';
import { RenderAgencyComponent } from './components/agency/render-agency/render-agency.component';
import { CreateAgencyComponent } from './components/agency/create-agency/create-agency.component';
import { RenderAgencyDetailComponent } from './components/agency/render-agency-detail/render-agency-detail.component';
import { CreateTokenComponent } from './components/agency/create-token/create-token.component';
import { RenderTokenComponent } from './components/agency/render-token/render-token.component';
import { RenderCertificateProfileComponent } from './components/agency/render-certificate-profile/render-certificate-profile.component';
import { CreateCertificateProfileComponent } from './components/agency/create-certificate-profile/create-certificate-profile.component';
import { ModalUserComponent } from './components/account/modal-user/modal-user.component';
import { RenderUserComponent } from './components/account/render-user/render-user.component';
import { ModalHistoryRequestComponent } from './components/modal/modal-history-request/modal-history-request.component';
import { ModalCertificateInfoComponent } from './components/modal/modal-certificate-info/modal-certificate-info.component';
import { ModalCertificatePukComponent } from './components/modal/modal-certificate-puk/modal-certificate-puk.component';
import { RenderDeviceImportExcelComponent } from './components/device/render-device-import-excel/render-device-import-excel.component';
import { ImportFilePkiComponent } from './components/modal/import-file-pki/import-file-pki.component';







@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    TemplateBaseComponent,
    // components
    LoginComponent,
    ListRequestComponent,
    ListFileNeacComponent,
    DatePipe,
    RenderDeviceListComponent,
    RenderDeviceInsertTokenLockUnLockComponent,
    PrimeDropDownDirective,
    DetailRequestComponent,
    MyImageComponent,
    ModalBaseComponent,
    RenderReportNeacComponent,
    RenderReportCertComponent,
    RenderReportCrossComponent,
    RenderReportExpiredComponent,
    RenderClientSearchComponent,
    RenderClientDetailComponent,
    ListRequestContentComponent,
    RenderDeviceListContentComponent,
    RenderUserInfoComponent,
    RenderSimProvisioningManagementComponent,
    RenderAgencyComponent,
    CreateAgencyComponent,
    RenderAgencyDetailComponent,
    CreateTokenComponent,
    RenderTokenComponent,
    RenderCertificateProfileComponent,
    CreateCertificateProfileComponent,
    ModalUserComponent,
    RenderUserComponent,
    ModalHistoryRequestComponent,
    ModalCertificateInfoComponent,
    ModalCertificatePukComponent,
    RenderDeviceImportExcelComponent,
    ImportFilePkiComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    PaginatorModule,
    PdfViewerModule,
    DialogModule,
    CardModule,
    ImageModule,
    ScrollTopModule,
    ScrollPanelModule,
    TabMenuModule,
    TabViewModule,
    ProgressBarModule
    
  ],
  providers: [
    { provide: HttpHeaders, useClass: HttpHeadersService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
