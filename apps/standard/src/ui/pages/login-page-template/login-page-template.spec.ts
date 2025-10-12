import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageTemplate } from './login-page-template';

describe('LoginPageTemplate', () => {
  let component: LoginPageTemplate;
  let fixture: ComponentFixture<LoginPageTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
