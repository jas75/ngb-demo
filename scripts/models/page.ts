import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-{{ fileName }}',
  templateUrl: './{{ fileName }}.component.html',
  styleUrls: ['./{{ fileName }}.component.scss']
})
export class {{ PascalCase }}Component implements OnInit {
  public ngOnInit() {
    // TODO
  }
}
