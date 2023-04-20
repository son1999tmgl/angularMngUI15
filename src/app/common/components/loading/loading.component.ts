import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isShow:boolean = false
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  public show() {
    this.isShow = true
  }

  public hide() {
    this.isShow = false
  }

}
