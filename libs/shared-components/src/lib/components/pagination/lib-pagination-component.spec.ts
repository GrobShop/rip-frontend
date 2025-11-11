import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibPaginationComponent } from './lib-pagination-component';

describe('LibPaginationComponent', () => {
  let component: LibPaginationComponent;
  let fixture: ComponentFixture<LibPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
