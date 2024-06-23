"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var _chunkXOYARAPPjs = require('./chunk-XOYARAPP.js');

// src/classes.ts
var _utils = require('@metamask/utils');
var _fastsafestringify = require('fast-safe-stringify'); var _fastsafestringify2 = _interopRequireDefault(_fastsafestringify);
var JsonRpcError = class extends Error {
  constructor(code, message, data) {
    var __super = (...args) => {
      super(...args);
    };
    if (!Number.isInteger(code)) {
      throw new Error('"code" must be an integer.');
    }
    if (!message || typeof message !== "string") {
      throw new Error('"message" must be a non-empty string.');
    }
    if (_chunkXOYARAPPjs.dataHasCause.call(void 0, data)) {
      __super(message, { cause: data.cause });
      if (!_utils.hasProperty.call(void 0, this, "cause")) {
        Object.assign(this, { cause: data.cause });
      }
    } else {
      __super(message);
    }
    if (data !== void 0) {
      this.data = data;
    }
    this.code = code;
  }
  /**
   * Get the error as JSON-serializable object.
   *
   * @returns A plain object with all public class properties.
   */
  serialize() {
    const serialized = {
      code: this.code,
      message: this.message
    };
    if (this.data !== void 0) {
      serialized.data = this.data;
      if (_utils.isPlainObject.call(void 0, this.data)) {
        serialized.data.cause = _chunkXOYARAPPjs.serializeCause.call(void 0, this.data.cause);
      }
    }
    if (this.stack) {
      serialized.stack = this.stack;
    }
    return serialized;
  }
  /**
   * Get a string representation of the serialized error, omitting any circular
   * references.
   *
   * @returns A string representation of the serialized error.
   */
  toString() {
    return _fastsafestringify2.default.call(void 0, this.serialize(), stringifyReplacer, 2);
  }
};
var EthereumProviderError = class extends JsonRpcError {
  /**
   * Create an Ethereum Provider JSON-RPC error.
   *
   * @param code - The JSON-RPC error code. Must be an integer in the
   * `1000 <= n <= 4999` range.
   * @param message - The JSON-RPC error message.
   * @param data - Optional data to include in the error.
   */
  constructor(code, message, data) {
    if (!isValidEthProviderCode(code)) {
      throw new Error(
        '"code" must be an integer such that: 1000 <= code <= 4999'
      );
    }
    super(code, message, data);
  }
};
function isValidEthProviderCode(code) {
  return Number.isInteger(code) && code >= 1e3 && code <= 4999;
}
function stringifyReplacer(_, value) {
  if (value === "[Circular]") {
    return void 0;
  }
  return value;
}




exports.JsonRpcError = JsonRpcError; exports.EthereumProviderError = EthereumProviderError;
//# sourceMappingURL=chunk-PV5NRPSS.js.map