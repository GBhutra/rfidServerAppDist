/**
 * Log model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _log = require('./log.model');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
LogEvents.setMaxListeners(0);
/*
// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Log.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LogEvents.emit(event + ':' + doc._id, doc);
    LogEvents.emit(event, doc);
  };
}*/

exports.default = LogEvents;
//# sourceMappingURL=log.events.js.map
