(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './ApiHierarchyValue'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ApiHierarchyValue'));
  } else {
    // Browser globals (root is window)
    if (!root.Category) {
      root.Category = {};
    }
    root.Category.ApiHierarchyList = factory(root.Category.ApiClient, root.Category.ApiHierarchyValue);
  }
}(this, function(ApiClient, ApiHierarchyValue) {
  'use strict';

  /**
   * The ApiHierarchyList model module.
   * @module model/ApiHierarchyList
   * @version v1
   */

  /**
   * Constructs a new <code>ApiHierarchyList</code>.
   * hierarchical list - list of hierarchy values
   * @alias module:model/ApiHierarchyList
   * @class
   */
  var exports = function() {



  };

  /**
   * Constructs a <code>ApiHierarchyList</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ApiHierarchyList} obj Optional instance to populate.
   * @return {module:model/ApiHierarchyList} The populated <code>ApiHierarchyList</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('items')) {
        obj['items'] = ApiClient.convertToType(data['items'], [ApiHierarchyValue]);
      }
      if (data.hasOwnProperty('kind')) {
        obj['kind'] = ApiClient.convertToType(data['kind'], 'String');
      }
    }
    return obj;
  }


  /**
   * list of hierarchy items, id-name-parentId
   * @member {Array.<module:model/ApiHierarchyValue>} items
   */
  exports.prototype['items'] = undefined;

  /**
   * describing the entity
   * @member {String} kind
   */
  exports.prototype['kind'] = undefined;




  return exports;
}));
