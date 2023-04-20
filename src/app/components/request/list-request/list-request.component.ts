import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '../../../common/components/loading/loading.component';
import { RequestService } from '../../../services/request.service';
import { RequestModule } from '../../../models/request/request.module';
import { AgencyService } from 'src/app/services/agency.service';

import * as _ from 'lodash';
import { Agency } from 'src/app/models/agency';
import { myFunc } from 'src/app/common/myFunc';
import { format } from 'date-fns'
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { concat } from 'lodash';


@Component({
    selector: 'app-list-request',
    templateUrl: './list-request.component.html',
    styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit {
    ngOnInit(): void {
        
    }

    public title = 'Danh sách giao dịch';

}
