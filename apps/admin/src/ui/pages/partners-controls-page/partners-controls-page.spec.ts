import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnersControlsPage } from './partners-controls-page';

describe('PartnersControlsPage', () => {
  let component: PartnersControlsPage;
  let fixture: ComponentFixture<PartnersControlsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersControlsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnersControlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
