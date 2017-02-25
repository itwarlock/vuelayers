import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEventPattern'

/**
 * Creates an Observable using OpenLayers event pattern that emits events of a specific type
 * coming from the given event target.
 *
 * @example <caption>Subscribe on view center change events</caption>
 * const map = ol.Map({ ... })
 * const changes = Observable.fromOlEvent(map.getView(), 'change:center')
 *
 * changes.subscribe(coordinate => console.log(coordinate))
 *
 * @param {ol.Object} target OpenLayers event target.
 * @param {string} eventName The event name of interest, being emitted by the `target`.
 * @param {function(...*): *} [selector] An optional function to post-process results. It takes the arguments
 *    from the event handler and should return a single value.
 * @return {Observable<T>}
 * @memberOf {Observable}
 */
export default function fromOlEvent (target, eventName, selector) {
  return Observable.fromEventPattern(
    handler => target.on(eventName, handler),
    handler => target.un(eventName, handler),
    selector
  )
}

Observable.fromOlEvent = fromOlEvent