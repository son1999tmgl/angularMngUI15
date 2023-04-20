import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderSimProvisioningManagementComponent } from './render-sim-provisioning-management.component';

describe('RenderSimProvisioningManagementComponent', () => {
  let component: RenderSimProvisioningManagementComponent;
  let fixture: ComponentFixture<RenderSimProvisioningManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderSimProvisioningManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderSimProvisioningManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
