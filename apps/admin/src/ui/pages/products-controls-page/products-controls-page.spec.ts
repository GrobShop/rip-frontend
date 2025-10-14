import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsControlsPage } from './products-controls-page';

describe('ProductsControlsPage', () => {
  let component: ProductsControlsPage;
  let fixture: ComponentFixture<ProductsControlsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsControlsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsControlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
