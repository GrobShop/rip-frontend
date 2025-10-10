import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryCardMinComponent } from './category-card-min-component';

describe('CategoryCardMinComponent', () => {
  let component: CategoryCardMinComponent;
  let fixture: ComponentFixture<CategoryCardMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCardMinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCardMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
