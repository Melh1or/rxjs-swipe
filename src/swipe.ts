import {fromEvent, merge, Observable, zip} from "rxjs";
import {map, pluck} from "rxjs/operators";

function getTouchEvent(event: TouchEvent | MouseEvent) {
    return event instanceof TouchEvent ? event.changedTouches[0] : event;
}

function getX(source1$: Observable<TouchEvent>, source2$: Observable<MouseEvent>) {
    return merge(source1$, source2$).pipe(
        map(getTouchEvent),
        pluck('clientX')
    )
}

function swipe(source$: Observable<[number, number]>) {
    return source$.pipe(
        map(([x, y]) => y - x)
    )
}

function directionHandler(direction: number) {
    return  console.log(direction < 0 ? 'Swipe left' : 'Swipe right')
}

swipe(zip<[number, number]>(
    getX(
        fromEvent<TouchEvent>(document, 'touchstart'),
        fromEvent<MouseEvent>(document, 'mousedown'),
    ),
    getX(
        fromEvent<TouchEvent>(document, 'touchend'),
        fromEvent<MouseEvent>(document, 'mouseup'),
    )
)).subscribe({
    next: directionHandler
});
