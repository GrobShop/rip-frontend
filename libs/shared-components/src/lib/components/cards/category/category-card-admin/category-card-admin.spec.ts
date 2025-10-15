import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryCardAdmin } from './category-card-admin';

describe('CategoryCardAdmin', () => {
  let component: CategoryCardAdmin;
  let fixture: ComponentFixture<CategoryCardAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCardAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCardAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
