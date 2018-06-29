import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthenticationService, private dataService: DataService) {}
}
