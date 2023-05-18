import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge } from 'rxjs';

const NUM_OF_REQUESTS = 20;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: unknown[] = [];

  constructor(public readonly client: HttpClient) {
  }

  load() {
    this.items = [];
    const http = Array(NUM_OF_REQUESTS);
    for (let i = 0 ; i < NUM_OF_REQUESTS ; ++i) {
      http[i] = this.client.get('http://localhost:3003/' + i);
    }
    merge(...http).subscribe(c => {
      console.log(c);
      this.items = [...this.items, c];
    })
  }
}
