import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlValidPromptComponent } from './form-control-valid-prompt.component';

describe('FormControlValidPromptComponent', () => {
  let component: FormControlValidPromptComponent;
  let fixture: ComponentFixture<FormControlValidPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlValidPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlValidPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
