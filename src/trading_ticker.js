'use strict'

const numberValidator = require('./validators/number')
const amountValidator = require('./validators/amount')
const priceValidator = require('./validators/price')
const symbolValidator = require('./validators/symbol')
const Model = require('./model')

/**
 * Plain trading ticker object used to instantiate model
 *
 * @typedef {object} TradingTickerData
 * @property {string} symbol - symbol
 * @property {number} bid - best bid
 * @property {number} bidSize - total bid size
 * @property {number} ask - best ask
 * @property {number} askSize - total ask size
 * @property {number} dailyChange - change in last 24h period
 * @property {number} dailyChangePerc - change in last 24h period as percent
 * @property {number} lastPrice - last price
 * @property {number} volume - volume in last 24h period
 * @property {number} high - highest price in last 24h period
 * @property {number} low - lowest price in last 24h period
 */

/**
 * Trading Ticker model
 *
 * @extends Model
 */
class TradingTicker extends Model {
  static FIELD_INDEX_MAPPING = {
    symbol: 0,
    bid: 1,
    bidSize: 2,
    ask: 3,
    askSize: 4,
    dailyChange: 5,
    dailyChangePerc: 6,
    lastPrice: 7,
    volume: 8,
    high: 9,
    low: 10
  };

  /** @type {string} */
  symbol;

  /** @type {number} */
  bid;

  /** @type {number} */
  bidSize;

  /** @type {number} */
  ask;

  /** @type {number} */
  askSize;

  /** @type {number} */
  dailyChange;

  /** @type {number} */
  dailyChangePerc;

  /** @type {number} */
  lastPrice;

  /** @type {number} */
  volume;

  /** @type {number} */
  high;

  /** @type {number} */
  low;

  /**
   * @param {TradingTickerData[]|TradingTickerData|Array[]|Array} data - trading
   *   ticker data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: TradingTicker.FIELD_INDEX_MAPPING,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: TradingTicker.FIELD_INDEX_MAPPING,
      data
    })
  }

  /**
   * Quote currency of the ticker
   *
   * @returns {string} quoteCurrency
   */
  quote () {
    return (this.symbol || '').substring(4)
  }

  /**
   * Base currency of the ticker
   *
   * @returns {string} baseCurrency
   */
  base () {
    return (this.symbol || '').substring(1, 4)
  }

  /**
   * Validates a given trading ticker instance
   *
   * @param {object[]|object|TradingTicker[]|TradingTicker|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields: TradingTicker.FIELD_INDEX_MAPPING,
      validators: {
        symbol: symbolValidator,
        bid: priceValidator,
        bidSize: amountValidator,
        ask: priceValidator,
        askSize: amountValidator,
        dailyChange: numberValidator,
        dailyChangePerc: numberValidator,
        lastPrice: priceValidator,
        volume: numberValidator,
        high: priceValidator,
        low: priceValidator
      }
    })
  }
}

module.exports = TradingTicker
