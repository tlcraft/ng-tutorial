import { Component, OnInit, inject } from '@angular/core';
import { Logger } from '../../services/log.service';
import { ModeService } from '../../services/mode-service';

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
  readonly modeService = inject(ModeService);

  ngOnInit() {
    this.logger.log("Loading the home page.");
    this.logger.log('Initial mode: ', this.modeService.getMode());
  }

  toggleMode() {
    this.modeService.toggle();
    this.logger.log('Mode: ', this.modeService.getMode());
  }
}
