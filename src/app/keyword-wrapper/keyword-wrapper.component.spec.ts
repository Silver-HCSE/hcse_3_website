import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordWrapperComponent } from './keyword-wrapper.component';

describe('KeywordWrapperComponent', () => {
  let component: KeywordWrapperComponent;
  let fixture: ComponentFixture<KeywordWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeywordWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
