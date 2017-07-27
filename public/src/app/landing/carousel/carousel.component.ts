import {Component} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-carousel-config',
  templateUrl: './carousel.component.html',
  providers: [NgbCarouselConfig]
})
export class NgbdCarouselConfig {
  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = true;
  }
}
