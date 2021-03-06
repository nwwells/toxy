const Toxy = require('./lib/toxy')
const rules = require('./lib/rules')
const poisons = require('./lib/poisons')

module.exports = toxy

/**
 * API factory
 */

function toxy(opts) {
  return new Toxy(opts)
}

/**
 * Expose internal modules as static members
 */

toxy.Rule      = require('./lib/rule')
toxy.Base      = require('./lib/base')
toxy.Directive = require('./lib/directive')
toxy.Rocky     = require('rocky').Rocky

/**
 * Expose current version
 */

toxy.VERSION = require('./package.json').version

/**
 * Expose built-in poisons
 */

toxy.poisons = Toxy.prototype.poisons = Object.create(null)

poisons.forEach(function (poison) {
  Toxy.prototype.poisons[poison.name] = function () {
    return poison.apply(null, arguments)
  }
})

/**
 * Expose built-in rules
 */

toxy.rules = Toxy.prototype.rules = Object.create(null)

rules.forEach(function (rule) {
  Toxy.prototype.rules[rule.name] = function () {
    return rule.apply(null, arguments)
  }
})
