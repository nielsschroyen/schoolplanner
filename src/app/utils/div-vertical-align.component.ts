import { Component } from '@angular/core';

@Component({
  selector: 'div-vertical-align',
  template: `
    <div style="display: table; height:100%; overflow: hidden;">
      <div style="display: table-cell; vertical-align: middle;">
        <div>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class DivVerticalAlignComponent {}
