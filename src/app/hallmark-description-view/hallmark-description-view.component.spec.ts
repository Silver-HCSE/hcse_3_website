import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallmarkDescriptionViewComponent } from './hallmark-description-view.component';

describe('HallmarkDescriptionViewComponent', () => {
  let component: HallmarkDescriptionViewComponent;
  let fixture: ComponentFixture<HallmarkDescriptionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HallmarkDescriptionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HallmarkDescriptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
