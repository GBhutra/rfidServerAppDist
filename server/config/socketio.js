/**
 * Socket.io configuration
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  /*require('socketio-auth')(socketio, {
  authenticate: function (socket, data, callback) {
    if (!data.email || !data.password )
      return callback(new Error("Need both email and passowrd for authentication ! "));
    User.findOne({
      email: data.email.toLowerCase()
    }).exec()
      .then(user => {
        if(!user) {
          return callback(new Error("User not found"));
        }
        if (!user.approved) {
          return callback(new Error("This email is not approved yet. Please contact Admin for access"));
        }
        user.authenticate(data.password, function(authError, authenticated) {
          if(authError) {
            return callback(new Error("Authentication error found"));
          }
          if(!authenticated) {
            return callback(new Error("In correct password"));
          } else {
            return callback(null, user);
          }
        });
      })
      .catch(err => callback(new Error("User not found")));
    },
    timeout : 5000
  });*/

  socketio.on('connection', function (socket) {
    socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;
    socket.connectedAt = new Date();

    socket.log = function () {
      var _console;

      for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['SocketIO ' + socket.nsp.name + ' [' + socket.address + ']'].concat(data));
    };

    socket.on('thing', function (data) {
      require('../api/thing/thing.socket').activate(socket, data);
    });

    // Call onDisconnect.
    socket.on('disconnect', function () {
      require('../api/thing/thing.socket').deActivate(socket);
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
};

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import config from './environment';

// When the user disconnects.. perform this
function onDisconnect() /*socket*/{}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    socket.log((0, _stringify2.default)(data, null, 2));
  });

  // Insert sockets below
  require('../api/thing/thing.socket').register(socket);
}
//# sourceMappingURL=socketio.js.map
