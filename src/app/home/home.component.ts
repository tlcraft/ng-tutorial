import { Component, OnInit, inject } from '@angular/core';
import { Logger } from '../../services/log.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  title = 'ng-tutorial';

  readonly logger = inject(Logger);

  ngOnInit() {
    this.logger.log("Loading the home page.");
  }
}
