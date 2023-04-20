import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderReportExpiredComponent } from './render-report-expired.component';

describe('RenderReportExpiredComponent', () => {
  let component: RenderReportExpiredComponent;
  let fixture: ComponentFixture<RenderReportExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderReportExpiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderReportExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
