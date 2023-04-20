import { Component, EventEmitter, Input, Output } from '@angular/core';
import { myFunc } from 'src/app/common/myFunc';
import { SimService } from 'src/app/services/sim.service';

@Component({
    selector: 'app-import-file-pki',
    templateUrl: './import-file-pki.component.html',
    styleUrls: ['./import-file-pki.component.scss']
})
export class ImportFilePkiComponent {

    _display = false
    file: any = ''
    listInfoSim: any = []
    value = 0

    //tổng các bản ghi hoàn thành
    totalCompleted = 0
    arrSuccess: any = []
    arrErr: any = []
    @Input()
    set display(value: any) {
        if (value == '' || value == false) {
            this._display = false
        }
        else {
            this._display = true
        }

    }
    @Output() displayChange = new EventEmitter<any>()


    constructor(
        private simService: SimService
    ) {

    }

    actionCloseModal() {
        this._display = false
        this.displayChange.emit(false)
    }

    readerFilePKI() {
        this.arrErr = []
        this.arrSuccess = []
        this.listInfoSim = myFunc.readFilePKI(this.file)

    }

    changeFile(event: any) {
        this.file = event.target.files[0]
        this.readerFilePKI()
    }


    async actionInsertSim() {
        this.arrErr = []
        this.arrSuccess = []
        for (const [index, sim] of this.listInfoSim.entries()) {
            try {
                await this.simService.insertSim(sim).toPromise();
                this.arrSuccess.push(index);
            } catch {
                this.arrErr.push(index);
            }
            this.value = Math.round((index + 1) / this.listInfoSim.length*100);
        }
    }

}
