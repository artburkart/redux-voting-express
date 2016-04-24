'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _server = require('./server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = exports.store = (0, _store2.default)();
(0, _server.startServer)(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('../entries.json')
});

store.dispatch({ type: 'NEXT' });
//# sourceMappingURL=index.js.map