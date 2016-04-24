var express = require('express');

export function router(store) {
  const router = express.Router();
  // const routes = <Route component

  // console.log(ReactDOMServer.renderToString(
  //   <Provider store={store}>
  //     <Router history={hashHistory}>{routes}</Router>
  //   </Provider>
  // ));

  /* GET home page. */
  router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
  });

  return router;
}
