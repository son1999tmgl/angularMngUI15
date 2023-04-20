import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDeviceImportExcelComponent } from './render-device-import-excel.component';

describe('RenderDeviceImportExcelComponent', () => {
  let component: RenderDeviceImportExcelComponent;
  let fixture: ComponentFixture<RenderDeviceImportExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderDeviceImportExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderDeviceImportExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
