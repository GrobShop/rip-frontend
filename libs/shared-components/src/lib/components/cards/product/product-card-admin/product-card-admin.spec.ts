import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardAdmin } from './product-card-admin';

describe('ProductCardAdmin', () => {
  let component: ProductCardAdmin;
  let fixture: ComponentFixture<ProductCardAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
