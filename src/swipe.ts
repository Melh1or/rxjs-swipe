import {fromEvent, Observable, zip} from "rxjs";
import {map, pluck} from "rxjs/operators";

function getX(source$: Observable<TouchEvent>) {
    return source$.pipe(
        pluck('changedTouches', '0', 'pageX')
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
    getX(fromEvent<TouchEvent>(document, 'touchstart')),
    getX(fromEvent<TouchEvent>(document, 'touchend'))
)).subscribe({
    next: directionHandler
});
