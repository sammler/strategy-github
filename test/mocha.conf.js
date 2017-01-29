const Global = require('./global');

const globalContext = new Global();

global.expect = require('chai').expect;
global.sinon = require('sinon');
require('sinon-mongoose');

process.env.NODE_ENV = 'test';

global.Context = globalContext.Context;

