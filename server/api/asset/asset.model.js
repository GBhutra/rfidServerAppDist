'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HighwaySignSchema = new _mongoose2.default.Schema({
  signText: { type: String, required: true },
  image: { type: String },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  location: { type: String, required: true }
});

var RFIDTagSchema = new _mongoose2.default.Schema({
  epcVal: {
    type: String,
    required: true,
    unique: true
  }
});

var AssetSchema = new _mongoose2.default.Schema({
  data: HighwaySignSchema,
  tag: RFIDTagSchema
});

exports.default = _mongoose2.default.model('Asset', AssetSchema);
//# sourceMappingURL=asset.model.js.map
