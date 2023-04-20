import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent implements OnInit {

  @Output() outputValue = new EventEmitter<string>();
  constructor() { }
  value :string = ''
  ngOnInit(): void {
  
  }

  changeValue(){
    this.outputValue.emit(this.value)
  }

}
