const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./server/routes');
const db = require('./server/models');

const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

app.use('/api', routes);

if (isDev) {
  const webpack = require('webpack');
  const devConfig = require('./webpack.config.development');
  const compiler = webpack(devConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: devConfig.output.publicPath,
    contentBase: 'client',
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  }));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(path.join(__dirname, '/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/bundle', '/index.html')); // TODO: sending document to browser
});

app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`listening on port: ${PORT}`);
});
