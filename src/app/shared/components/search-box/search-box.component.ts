import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';
  // @Output()
  // public onValue: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public initialValue: string = '';

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(300), // barrera
      )
      .subscribe(value => {
        // console.log('Debouncer:', value);
        this.onDebounce.emit(value);
      });
  }

  // Destruir el componente
  ngOnDestroy(): void {
    // console.log('destroy');
    this.debouncerSubscription?.unsubscribe();
  }

  // emitValue(value: string): void {
  //   // Emitir el término de búsqueda
  //   this.onValue.emit(value);
  // }

  // *Debounce: Esperar a que el usuario deje de escribir para lanzar la petición
  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
