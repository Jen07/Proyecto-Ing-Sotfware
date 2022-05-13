import { BehaviorSubject, of } from 'rxjs';
import { Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  @Output()
  isLoading!: BehaviorSubject<boolean>;

  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
  }
}
