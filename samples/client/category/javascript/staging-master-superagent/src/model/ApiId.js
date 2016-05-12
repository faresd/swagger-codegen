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
    root.Category.ApiId = factory(root.Category.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The ApiId model module.
   * @module model/ApiId
   * @version v1
   */

  /**
   * Constructs a new <code>ApiId</code>.
   * class for storing an id
   * @alias module:model/ApiId
   * @class
   */
  var exports = function() {



  };

  /**
   * Constructs a <code>ApiId</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ApiId} obj Optional instance to populate.
   * @return {module:model/ApiId} The populated <code>ApiId</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('kind')) {
        obj['kind'] = ApiClient.convertToType(data['kind'], 'String');
      }
    }
    return obj;
  }


  /**
   * identifier for the entity
   * @member {String} id
   */
  exports.prototype['id'] = undefined;

  /**
   * describing the entity
   * @member {String} kind
   */
  exports.prototype['kind'] = undefined;




  return exports;
}));
