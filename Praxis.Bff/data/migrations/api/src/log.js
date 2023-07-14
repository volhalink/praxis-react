const chalk = require('chalk');

const info = function(key, msg) {
    console.log('  ' + chalk.blue(key) + ' : ' + chalk.cyan(msg))
};

const error = function(key, msg) {
    console.error('  ' + chalk.red(key) + ' : ' + chalk.white(msg))
    if (msg instanceof Error) {
      console.error(msg)
    }
  }

module.exports = {
    info,
    error
}