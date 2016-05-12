(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['./ApiClient', './model/ApiCategoryDefinition', './model/ApiHierarchyList', './model/ApiHierarchyValue', './model/ApiId', './model/ApiNameValue', './model/ApiNameValueList', './api/CategoryApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/ApiCategoryDefinition'), require('./model/ApiHierarchyList'), require('./model/ApiHierarchyValue'), require('./model/ApiId'), require('./model/ApiNameValue'), require('./model/ApiNameValueList'), require('./api/CategoryApi'));
  }
}(function(ApiClient, ApiCategoryDefinition, ApiHierarchyList, ApiHierarchyValue, ApiId, ApiNameValue, ApiNameValueList, CategoryApi) {
  'use strict';

  /**
   * Lets you manage (list, load, patch, update, add new, delete) categories and category values.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var Category = require('./index'); // See note below*.
   * var xxxSvc = new Category.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new Category.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['./index'], function(){...}) and put the application logic within the
   * callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new Category.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new Category.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version v1
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The ApiCategoryDefinition model constructor.
     * @property {module:model/ApiCategoryDefinition}
     */
    ApiCategoryDefinition: ApiCategoryDefinition,
    /**
     * The ApiHierarchyList model constructor.
     * @property {module:model/ApiHierarchyList}
     */
    ApiHierarchyList: ApiHierarchyList,
    /**
     * The ApiHierarchyValue model constructor.
     * @property {module:model/ApiHierarchyValue}
     */
    ApiHierarchyValue: ApiHierarchyValue,
    /**
     * The ApiId model constructor.
     * @property {module:model/ApiId}
     */
    ApiId: ApiId,
    /**
     * The ApiNameValue model constructor.
     * @property {module:model/ApiNameValue}
     */
    ApiNameValue: ApiNameValue,
    /**
     * The ApiNameValueList model constructor.
     * @property {module:model/ApiNameValueList}
     */
    ApiNameValueList: ApiNameValueList,
    /**
     * The CategoryApi service constructor.
     * @property {module:api/CategoryApi}
     */
    CategoryApi: CategoryApi
  };

  return exports;
}));
