import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesControlsPage } from './categories-controls-page';

describe('CategoriesControlsPage', () => {
  let component: CategoriesControlsPage;
  let fixture: ComponentFixture<CategoriesControlsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesControlsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesControlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
