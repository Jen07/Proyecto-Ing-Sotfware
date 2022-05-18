import { Subscription } from 'rxjs';
import { LoadingService } from '@core/services/loading.service';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('loading', { static: false }) rawLoading: any;
  loadingElement!: HTMLElement;
  observers: Subscription[] = [];
  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadingElement = this.rawLoading.nativeElement;

    this.observers.push(
      this.loadingService.isLoading.subscribe((data) => {
       
        if (data) {
          this.loadingElement.classList.add('activated')
          this.loadingElement.classList.remove('unshow_animation');
          this.loadingElement.classList.add('show_animation');
        } else {
          this.loadingElement.classList.remove('activated')
          this.loadingElement.classList.remove('show_animation');
          this.loadingElement.classList.add('unshow_animation');
        }
      })
    );
    
    /* Se remueve la animacion de ocultación al crear la vista. */
    this.loadingElement.classList.remove('unshow_animation');
  }

  ngOnDestroy(): void {
    this.observers.forEach((element) => {
      element.unsubscribe();
    });
  }
}
