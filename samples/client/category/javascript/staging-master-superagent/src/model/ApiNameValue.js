(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.Category) {
      root.Category = {};
    }
    root.Category.ApiNameValue = factory(root.Category.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The ApiNameValue model module.
   * @module model/ApiNameValue
   * @version v1
   */

  /**
   * Constructs a new <code>ApiNameValue</code>.
   * A name-value pair having a kind for distinction
   * @alias module:model/ApiNameValue
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>ApiNameValue</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ApiNameValue} obj Optional instance to populate.
   * @return {module:model/ApiNameValue} The populated <code>ApiNameValue</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('kind')) {
        obj['kind'] = ApiClient.convertToType(data['kind'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'String');
      }
    }
    return obj;
  }


  /**
   * describing the entity
   * @member {String} kind
   */
  exports.prototype['kind'] = undefined;

  /**
   * the name displayed
   * @member {String} name
   */
  exports.prototype['name'] = undefined;

  /**
   * the real value
   * @member {String} value
   */
  exports.prototype['value'] = undefined;




  return exports;
}));
