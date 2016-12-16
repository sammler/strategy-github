import Global from './global';
require('babel-core/register');
require('babel-polyfill');

const globalContext = new Global();

global.expect = require('chai').expect;
global.sinon = require('sinon');
require('sinon-mongoose');

global.Context = globalContext.Context;

