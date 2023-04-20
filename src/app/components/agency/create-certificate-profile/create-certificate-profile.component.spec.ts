import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCertificateProfileComponent } from './create-certificate-profile.component';

describe('CreateCertificateProfileComponent', () => {
  let component: CreateCertificateProfileComponent;
  let fixture: ComponentFixture<CreateCertificateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCertificateProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCertificateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
