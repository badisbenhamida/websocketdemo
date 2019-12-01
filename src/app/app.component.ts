import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Sockette from 'sockette';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  title = "Web Socket Demo";	
  private s: Sockette;
constructor(private router: Router) {}
  ngOnInit() {
  this.s = new Sockette('wss://jrmugob5va.execute-api.us-east-1.amazonaws.com/prod', {
  timeout: 5e3,
  maxAttempts: 10,
  onopen: e => console.log('Connected!', e),
  onmessage: e => {
    console.log('Received:', e);
    this.router.navigate(['/' + e.data]).then(nav => {
    console.log(nav); // true if navigation is successful
  }, err => {
    console.log(err) // when there's an error
  });
  },
  onreconnect: e => console.log('Reconnecting...', e),
  onmaximum: e => console.log('Stop Attempting!', e),
  onclose: e => console.log('Closed!', e),
  onerror: e => console.log('Error:', e)
});
}
}
