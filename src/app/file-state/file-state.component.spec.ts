import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileStateComponent } from './file-state.component';

describe('FileStateComponent', () => {
  let component: FileStateComponent;
  let fixture: ComponentFixture<FileStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
