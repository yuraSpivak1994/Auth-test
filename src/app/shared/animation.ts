import {
  trigger,
  transition, animate, style, state
} from '@angular/animations';


export const slideInAnimation =
  trigger('simpleFadeAnimation', [

    state('in', style({opacity: 1})),

    transition(':enter', [
      style({opacity: 0}),
      animate(600 )
    ]),

    transition(':leave',
      animate(600, style({opacity: 0})))
  ]);
