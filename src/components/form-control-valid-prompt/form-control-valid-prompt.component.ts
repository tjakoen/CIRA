import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-control-valid-prompt',
  templateUrl: './form-control-valid-prompt.component.html',
})
export class FormControlValidPromptComponent {
  @Input() valid: Boolean;
}
