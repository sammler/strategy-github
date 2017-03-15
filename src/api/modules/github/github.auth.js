const fs = require('fs');
const path = require('path');
const logger = require('winster').instance();

let config = null;

const p = path.join(process.env.HOME, '.s5rrc');
if (fs.existsSync(p)) {
  logger.trace('OK, load file: ', p);
  config = JSON.parse(fs.readFileSync(p, 'utf8'));
} else {
  console.log('OK, we have to set it manually');
  config = {
    type: 'oauth',
    token: process.env.S5R_STRATEGY_GITHUB__TOKEN
  };
}

module.exports = config;
