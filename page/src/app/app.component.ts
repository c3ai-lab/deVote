import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'deVote';

  public fixedHeader: boolean = false;

  constructor() {}

  public openLink(url: string): void {
    window.open(url, '_blank');
  }

  // event to determine if the header class should be changed
  @HostListener('window:scroll', ['$event']) 
  checkPageOffset(event) {
    this.fixedHeader = window.pageYOffset > 110;
  }
}
