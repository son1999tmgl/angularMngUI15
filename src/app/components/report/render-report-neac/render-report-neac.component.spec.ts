import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderReportNeacComponent } from './render-report-neac.component';

describe('RenderReportNeacComponent', () => {
  let component: RenderReportNeacComponent;
  let fixture: ComponentFixture<RenderReportNeacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderReportNeacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderReportNeacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
