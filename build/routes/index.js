'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = router;
var express = require('express');

function router(store) {
  var router = express.Router();
  // const routes = <Route component

  // console.log(ReactDOMServer.renderToString(
  //   <Provider store={store}>
  //     <Router history={hashHistory}>{routes}</Router>
  //   </Provider>
  // ));

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  return router;
}
//# sourceMappingURL=index.js.map