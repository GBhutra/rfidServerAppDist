'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HighwaySignLogSchema = new _mongoose2.default.Schema({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  signText: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date },
  readCount: { type: Number }
});

var RFIDTagSchema = new _mongoose2.default.Schema({
  epcVal: {
    type: String,
    required: true,
    unique: false
  }
});

var LogSchema = new _mongoose2.default.Schema({
  tag: RFIDTagSchema,
  logData: HighwaySignLogSchema
});

exports.default = _mongoose2.default.model('Log', LogSchema);
//# sourceMappingURL=log.model.js.map
