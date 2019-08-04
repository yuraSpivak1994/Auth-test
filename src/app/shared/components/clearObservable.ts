import { OnDestroy } from "@angular/core";
import { Subject } from "rxjs";


export class ClearObservable implements OnDestroy {
  destroy$: Subject<boolean> = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
