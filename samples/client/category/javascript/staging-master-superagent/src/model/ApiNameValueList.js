(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './ApiNameValue'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ApiNameValue'));
  } else {
    // Browser globals (root is window)
    if (!root.Category) {
      root.Category = {};
    }
    root.Category.ApiNameValueList = factory(root.Category.ApiClient, root.Category.ApiNameValue);
  }
}(this, function(ApiClient, ApiNameValue) {
  'use strict';

  /**
   * The ApiNameValueList model module.
   * @module model/ApiNameValueList
   * @version v1
   */

  /**
   * Constructs a new <code>ApiNameValueList</code>.
   * list of ApiNameValue name-value pairs with a kind
   * @alias module:model/ApiNameValueList
   * @class
   */
  var exports = function() {



  };

  /**
   * Constructs a <code>ApiNameValueList</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ApiNameValueList} obj Optional instance to populate.
   * @return {module:model/ApiNameValueList} The populated <code>ApiNameValueList</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('items')) {
        obj['items'] = ApiClient.convertToType(data['items'], [ApiNameValue]);
      }
      if (data.hasOwnProperty('kind')) {
        obj['kind'] = ApiClient.convertToType(data['kind'], 'String');
      }
    }
    return obj;
  }


  /**
   * list of @see ApiNameValue name-value pairs
   * @member {Array.<module:model/ApiNameValue>} items
   */
  exports.prototype['items'] = undefined;

  /**
   * describing the entity
   * @member {String} kind
   */
  exports.prototype['kind'] = undefined;




  return exports;
}));
