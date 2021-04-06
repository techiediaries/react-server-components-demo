/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const register = require('react-server-dom-webpack/node-register');
register();
const babelRegister = require('@babel/register');

babelRegister({
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [['react-app', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs'],
});


const express = require('express');
const compress = require('compression');
const {readFileSync} = require('fs');

const {pipeToNodeWritable} = require('react-server-dom-webpack/writer');
const path = require('path');

const React = require('react');
const ReactApp = require('../src/App.server').default;


const PORT = 4000;
const app = express();

app.use(compress());
app.use(express.json());

app.use(express.static('build'));
app.use(express.static('public'));



app.listen(PORT, () => {
  console.log(`RSC Demo listening at http://localhost:${PORT}`);
});


app.get(
  '/',
  async (req, res) => {
    const html = readFileSync(
      path.resolve(__dirname, '../build/index.html'),
      'utf8'
    );
    res.send(html);
  }
);

app.get('/react', function(req, res) {
  
  const props = JSON.parse(req.query.props);
  res.set('X-Props', JSON.stringify(props));
  const manifest = readFileSync(
    path.resolve(__dirname, '../build/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);
  return pipeToNodeWritable(React.createElement(ReactApp, props), res, moduleMap);

});

