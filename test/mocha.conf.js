const Global = require('./global');

const globalContext = new Global();

global.expect = require('chai').expect;
global.sinon = require('sinon');
require('sinon-mongoose');

global.Context = globalContext.Context;

