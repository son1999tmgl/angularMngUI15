import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { format } from 'date-fns'
import { DeviceModule } from 'src/app/models/device/device.module';
import { DeviceService } from 'src/app/services/device.service';
import { ConfigSetting } from 'src/app/common/config/configSetting';
import { read, utils, writeFile } from 'xlsx';




@Component({
    selector: 'app-render-device-list',
    templateUrl: './render-device-list.component.html',
    styleUrls: ['./render-device-list.component.scss']
})
export class RenderDeviceListComponent implements OnInit {


    @ViewChild('inputFile') inputFile: any
    public title = 'Danh sách giao dịch'
    ngOnInit(): void {
    }

    openInputFile() {
        console.log(123);
        this.inputFile.nativeElement.click()
        
    }

    importFile($event: any) {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    console.log('rows: ', rows);
                    
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    

}
