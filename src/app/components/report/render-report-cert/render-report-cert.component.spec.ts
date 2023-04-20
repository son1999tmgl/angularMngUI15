import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderReportCertComponent } from './render-report-cert.component';

describe('RenderReportCertComponent', () => {
  let component: RenderReportCertComponent;
  let fixture: ComponentFixture<RenderReportCertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderReportCertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderReportCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
