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
    root.Category.ApiHierarchyValue = factory(root.Category.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The ApiHierarchyValue model module.
   * @module model/ApiHierarchyValue
   * @version v1
   */

  /**
   * Constructs a new <code>ApiHierarchyValue</code>.
   * hierarchy entry, a name-id pairs with parentId for hierarchies
   * @alias module:model/ApiHierarchyValue
   * @class
   */
  var exports = function() {





  };

  /**
   * Constructs a <code>ApiHierarchyValue</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ApiHierarchyValue} obj Optional instance to populate.
   * @return {module:model/ApiHierarchyValue} The populated <code>ApiHierarchyValue</code> instance.
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
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('parentId')) {
        obj['parentId'] = ApiClient.convertToType(data['parentId'], 'String');
      }
    }
    return obj;
  }


  /**
   * the real value or identifier
   * @member {String} id
   */
  exports.prototype['id'] = undefined;

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
   * the parent identifier
   * @member {String} parentId
   */
  exports.prototype['parentId'] = undefined;




  return exports;
}));
