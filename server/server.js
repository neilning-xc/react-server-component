'use strict';
const register = require('react-server-dom-webpack/node-register');
register();

const babelRegister = require('@babel/register');
babelRegister({
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: ['@babel/transform-modules-commonjs'],
});

const express = require('express');
const path = require('path');
const { readFileSync } = require('fs');

const { renderToPipeableStream } = require('react-server-dom-webpack/server');
const React = require('react');
const Home = require('../src/Home').default;
const About = require('../src/About').default;

const routes = {
  home: Home,
  about: About,
};

//------------------------------------------------------------
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/react/:path', (req, res) => {
  const route = req.params.path;
  console.log('🚀 ~ app.get ~ route:', route);
  const manifest = readFileSync(
    path.join(__dirname, '../build/react-client-manifest.json'),
    'utf-8',
  );
  const moduleMap = JSON.parse(manifest);
  const Component = routes[route];
  const { pipe } = renderToPipeableStream(
    React.createElement(Component),
    moduleMap,
  );
  pipe(res);
});

app.use(express.static('build'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening on port 3000');
});
