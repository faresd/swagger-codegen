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
    root.Category.ApiCategoryDefinition = factory(root.Category.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The ApiCategoryDefinition model module.
   * @module model/ApiCategoryDefinition
   * @version v1
   */

  /**
   * Constructs a new <code>ApiCategoryDefinition</code>.
   * @alias module:model/ApiCategoryDefinition
   * @class
   */
  var exports = function() {









  };

  /**
   * Constructs a <code>ApiCategoryDefinition</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ApiCategoryDefinition} obj Optional instance to populate.
   * @return {module:model/ApiCategoryDefinition} The populated <code>ApiCategoryDefinition</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('dynamicValues')) {
        obj['dynamicValues'] = ApiClient.convertToType(data['dynamicValues'], 'Boolean');
      }
      if (data.hasOwnProperty('folder')) {
        obj['folder'] = ApiClient.convertToType(data['folder'], 'Boolean');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('kind')) {
        obj['kind'] = ApiClient.convertToType(data['kind'], 'String');
      }
      if (data.hasOwnProperty('levelNames')) {
        obj['levelNames'] = ApiClient.convertToType(data['levelNames'], ['String']);
      }
      if (data.hasOwnProperty('libraryId')) {
        obj['libraryId'] = ApiClient.convertToType(data['libraryId'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('tags')) {
        obj['tags'] = ApiClient.convertToType(data['tags'], 'Boolean');
      }
    }
    return obj;
  }


  /**
   * has dynamic values
   * @member {Boolean} dynamicValues
   */
  exports.prototype['dynamicValues'] = undefined;

  /**
   * @member {Boolean} folder
   */
  exports.prototype['folder'] = undefined;

  /**
   * the unique categoryDefinition ID
   * @member {String} id
   */
  exports.prototype['id'] = undefined;

  /**
   * the kind in google
   * @member {String} kind
   */
  exports.prototype['kind'] = undefined;

  /**
   * @member {Array.<String>} levelNames
   */
  exports.prototype['levelNames'] = undefined;

  /**
   * the library ID from which the categoryDefinition is
   * @member {String} libraryId
   */
  exports.prototype['libraryId'] = undefined;

  /**
   * the categoryDefinition name
   * @member {String} name
   */
  exports.prototype['name'] = undefined;

  /**
   * @member {Boolean} tags
   */
  exports.prototype['tags'] = undefined;




  return exports;
}));
