import { isError, stateAction } from 'modules-pack/redux'
import { socketActionSigned } from 'modules-pack/socket'
import { SERVER, SOCKET_SERVER } from 'modules-pack/variables'
import { __DEV__, ACTIVE, ERROR, formatNumber, log, logClear, REPORT, warn, } from 'utils-pack'
import { MAX_CONSOLE_RECORDS } from './constants'
import { actionTypeColor, latencyColor, Log } from './utils'

/**
 * NODE.JS LOGGER MIDDLEWARE ===================================================
 * =============================================================================
 */

/**
 * Create Logger Middleware
 *
 * @return {function(*=)} - middleware for use in Redux createStore()
 */
export function createLoggerMiddleware () {
  return store => {
    const middleware = new Middleware(store)
    return next => action => {
      middleware.log(action)
      return next(action)
    }
  }
}

export class Middleware {
  constructor (store) {
    this.store = store
    this._count = 0
    this._timestamp = Date.now()
  }

  get lastTimestamp () {
    return this._timestamp
  }

  get count () {
    return this._count
  }

  log (action) {
    if (__DEV__) this.console(action)
    if (isError(action)) this.logError(action)
  }

  /* Log Action to Console */
  console (action) {
    const {type, meta: {request: {latency} = {}} = {}} = action
    const shouldShowLatency = latency && (type.indexOf('http') === 0 || type.indexOf('ws') === 0)
    const now = Date.now()
    const stats = `+${formatNumber(now - this.lastTimestamp)} ms` +
      (shouldShowLatency ? ', ' + ACTIVE.log.keyword(latencyColor(latency))(`~${formatNumber(latency)} ms`) : '')

    /* Clear Console when Limit exceeded */
    this.setTimestamp(now)
    if (this.count > MAX_CONSOLE_RECORDS) {
      this.resetCount()
      logClear()
    }
    this.incrementCount()

    /* Display Action type in Console */
    log(type, `color: ${actionTypeColor(type)}`, stats)
    if (isError(action)) warn(action)
  }

  /* Record Error Action */
  logError (action) {
    action.timestamp = Date.now()
    action.service = ACTIVE.SERVICE

    /* When Run in Server */
    if (ACTIVE.SERVICE === SERVER) return Log.handleError(action)

    /* When Run in Other Services, Notify Server about this Error */
    try {
      this.store.dispatch(socketActionSigned(SOCKET_SERVER, stateAction(ERROR, REPORT, {item: action})))
    } catch (err) {
      try {
        // Action payload from API can be an Error object
        action.payload = action.payload.toString()
        this.store.dispatch(socketActionSigned(SOCKET_SERVER, stateAction(ERROR, REPORT, {item: action})))
      } catch (err) {
        warn('Cannot Convert to JSON!!!', action)
      }
    }
  }

  incrementCount () {
    this._count++
  }

  resetCount () {
    this._count = 0
  }

  setTimestamp (milliseconds) {
    this._timestamp = milliseconds
  }
}