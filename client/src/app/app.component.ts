import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  presentFeed = {};

  feedUpdate(feed:any){
    this.presentFeed = feed;
  }
}
