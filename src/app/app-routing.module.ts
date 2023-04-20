import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './common/components/loading/loading.component';
import { LoginComponent } from './components/account/login/login.component';
import { DetailRequestComponent } from './components/request/detail-request/detail-request.component';
import { ListFileNeacComponent } from './components/list-file-neac/list-file-neac.component';
import { RenderClientDetailComponent } from './components/render-client-detail/render-client-detail.component';
import { RenderClientSearchComponent } from './components/render-client-search/render-client-search.component';
import { RenderDeviceInsertTokenLockUnLockComponent } from './components/device/render-device-insert-token-lock-un-lock/render-device-insert-token-lock-un-lock.component';
import { RenderDeviceListComponent } from './components/device/render-device-list/render-device-list.component';
import { RenderReportCertComponent } from './components/report/render-report-cert/render-report-cert.component';
import { RenderReportCrossComponent } from './components/report/render-report-cross/render-report-cross.component';
import { RenderReportExpiredComponent } from './components/report/render-report-expired/render-report-expired.component';
import { RenderReportNeacComponent } from './components/report/render-report-neac/render-report-neac.component';
import { ListRequestComponent } from './components/request/list-request/list-request.component';
import { RenderUserInfoComponent } from './components/account/render-user-info/render-user-info.component';
import { RenderSimProvisioningManagementComponent } from './components/render-sim-provisioning-management/render-sim-provisioning-management.component';
import { RenderAgencyComponent } from './components/agency/render-agency/render-agency.component';
import { RenderAgencyDetailComponent } from './components/agency/render-agency-detail/render-agency-detail.component';
import { RenderTokenComponent } from './components/agency/render-token/render-token.component';
import { RenderUserComponent } from './components/account/render-user/render-user.component';
import { RenderDeviceImportExcelComponent } from './components/device/render-device-import-excel/render-device-import-excel.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'renderListRequest', component: ListRequestComponent },
    { path: 'loading', component: LoadingComponent },
    { path: 'listFileNEAC', component: ListFileNeacComponent },
    { path: 'renderDeviceList', component: RenderDeviceListComponent },
    { path: 'renderDeviceInsertTokenLockUnLockComponent', component: RenderDeviceInsertTokenLockUnLockComponent },
    { path: 'renderDetailRequest', component: DetailRequestComponent },
    { path: 'renderReportNEAC', component: RenderReportNeacComponent },
    { path: 'renderReportCert', component: RenderReportCertComponent },
    { path: 'renderReportCross', component: RenderReportCrossComponent },
    { path: 'renderReportExpired', component: RenderReportExpiredComponent },
    { path: 'renderClientSearch', component: RenderClientSearchComponent },
    { path: 'renderClientDetail', component: RenderClientDetailComponent },
    { path: 'renderUserInfo', component: RenderUserInfoComponent },
    { path: 'renderSimProvisioningManagement', component: RenderSimProvisioningManagementComponent },
    { path: 'renderAgency', component: RenderAgencyComponent },
    { path: 'renderAgencyDetail', component: RenderAgencyDetailComponent },
    { path: 'renderToken', component: RenderTokenComponent },
    { path: 'renderUser', component: RenderUserComponent },
    { path: 'renderDeviceImportExcel', component: RenderDeviceImportExcelComponent },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
