/**
 * Broadcast updates to client when the model changes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;
exports.activate = activate;
exports.deActivate = deActivate;

var _thing = require('./thing.events');

var _thing2 = _interopRequireDefault(_thing);

var _thing3 = require('./thing.model');

var _thing4 = _interopRequireDefault(_thing3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Model events to emit
var events = ['save', 'remove'];

var thingConnections = [];

function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('thing:' + event, socket);

    _thing2.default.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}

function activate(socket, data) {
  var conn = thingConnections.find(function (conn) {
    return conn.socket === socket;
  });
  if (!conn) {
    _thing4.default.findOne({ 'macAddress': data.macAddress }).exec().then(function (doc) {
      doc.active = true;
      doc.save();
      thingConnections.push({ thingId: doc._id, socket: socket });
    }).catch(function (err) {
      thingConnections.splice(conn);
    });
  }
}

function deActivate(socket) {
  var conn = thingConnections.find(function (conn) {
    return conn.socket === socket;
  });
  if (conn) {
    _thing4.default.findById(conn.thingId).exec().then(function (doc) {
      doc.active = false;
      doc.save();
      socket.emit();
      thingConnections.splice(conn);
    }).catch(function (err) {
      thingConnections.splice(conn);
    });
  }
}

function findSocket(socket) {
  return thingConnections.socket === socket;
}

function createListener(event, socket) {
  return function (doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function () {
    _thing2.default.removeListener(event, listener);
  };
}
//# sourceMappingURL=thing.socket.js.map
