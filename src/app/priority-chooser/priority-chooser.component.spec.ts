import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityChooserComponent } from './priority-chooser.component';

describe('PriorityChooserComponent', () => {
  let component: PriorityChooserComponent;
  let fixture: ComponentFixture<PriorityChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityChooserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriorityChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
