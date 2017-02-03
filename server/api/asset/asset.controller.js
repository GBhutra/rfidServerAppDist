/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/assets              ->  index
 * GET     /api/assets/loc          ->  index of locations
 * GET     /api/assets/nums         ->  number of tagged, untagged and total assets
 * POST    /api/assets              ->  create
 * GET     /api/assets/:id          ->  show
 * PUT     /api/assets/:id          ->  upsert
 * PATCH   /api/assets/:id          ->  patch
 * DELETE  /api/assets/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.locationIndex = locationIndex;
exports.numbers = numbers;
exports.show = show;
exports.locationAssetIndex = locationAssetIndex;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _asset = require('./asset.model');

var _asset2 = _interopRequireDefault(_asset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Assets
function index(req, res) {
  return _asset2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Locations
function locationIndex(req, res) {
  return _asset2.default.distinct("data.location").exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Gets the number of tagged, untagged and total assets
function numbers(req, res) {
  var result = {};
  result.numAssets = 0;
  result.numTags = 0;
  return _asset2.default.count().exec().then(function (numAssets) {
    _asset2.default.count({ tag: { $exists: false } }).exec().then(function (numTags) {
      result.numAssets = numAssets;
      result.numTags = numTags;
      return res.status(200).json(result);
    });
  }).catch(handleError(res));
}

// Gets a single Asset from the DB
function show(req, res) {
  return _asset2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Assets belonging to the same location from the DB
function locationAssetIndex(req, res) {
  return _asset2.default.find({ "data.location": req.params.id }).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Asset in the DB
function create(req, res) {
  return _asset2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Asset in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _asset2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Asset in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _asset2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Asset from the DB
function destroy(req, res) {
  return _asset2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=asset.controller.js.map
