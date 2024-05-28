import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordRatingComponent } from './keyword-rating.component';

describe('KeywordRatingComponent', () => {
  let component: KeywordRatingComponent;
  let fixture: ComponentFixture<KeywordRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeywordRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
