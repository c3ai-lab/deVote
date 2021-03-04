import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'deVote';
  public smallScreen: boolean = false;
  public fixedHeader: boolean = false;

  constructor() {
    this.smallScreen = window.innerWidth < 1200;
  }

  public openLink(url: string): void {
    window.open(url, '_blank');
  }

  // event to determine if the header class should be changed
  @HostListener('window:scroll', ['$event'])
  checkPageOffset(event) {
    this.smallScreen = window.innerWidth < 1200;
    this.fixedHeader = window.pageYOffset > 110;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.smallScreen = window.innerWidth < 1200;
  }
}
