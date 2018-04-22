import {
  trigger,
  style,
  state,
  transition,
  animate
} from '@angular/animations';

export const stockAnimation = trigger('stockAnimation', [
  state('active', style({})),
  transition('void => *', [
    style({ transform: 'translateY(50%)' }),
    animate('100ms cubic-bezier(0.68, -0.55, 0.265, 1.55)')
  ]),
  transition('* => void', [
    animate(
      '100ms ease-out',
      style({
        opacity: 0,
        transform: 'translateX(0) scale(0.5)'
      })
    )
  ])
]);

export const entraceAnimation = trigger('entraceAnimation', [
  state('active', style({})),
  transition('void => *', [
    style({ transform: 'translateY(50%)' }),
    animate('100ms cubic-bezier(0.68, -0.55, 0.265, 1.55)')
  ])
]);

export const controlAnimation = trigger('controlAnimation', [
  state('active', style({})),
  transition('void => *', [
    style({ transform: 'translateX(50%)' }),
    animate('100ms cubic-bezier(0.68, -0.55, 0.265, 1.55)')
  ])
]);

export const arrowAnimation = trigger('arrowAnimation', [
  state('true', style({})),
  transition('void => *', [
    style({ transform: 'translateX(20%)' }),
    animate('200ms ease-in')
  ])
]);
