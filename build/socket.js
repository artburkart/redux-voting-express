'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSocket = startSocket;
function startSocket(app, store) {
  store.subscribe(function () {
    return app.io.emit('state', store.getState().toJS());
  });

  app.io.on('connection', function (socket) {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
//# sourceMappingURL=socket.js.map