import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardComponent1 } from './user-dashboard1.component';

describe('UserDashboard1Component', () => {
  let component: UserDashboardComponent1;
  let fixture: ComponentFixture<UserDashboardComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashboardComponent1 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
