import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent {
  @Input() idModal: string = ''
  @Input() title: string = ''
  @Input() style: any = ""

}
