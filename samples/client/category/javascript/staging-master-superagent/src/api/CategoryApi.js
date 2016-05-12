(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/ApiId', '../model/ApiCategoryDefinition', '../model/ApiNameValue', '../model/ApiNameValueList', '../model/ApiHierarchyList'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ApiId'), require('../model/ApiCategoryDefinition'), require('../model/ApiNameValue'), require('../model/ApiNameValueList'), require('../model/ApiHierarchyList'));
  } else {
    // Browser globals (root is window)
    if (!root.Category) {
      root.Category = {};
    }
    root.Category.CategoryApi = factory(root.Category.ApiClient, root.Category.ApiId, root.Category.ApiCategoryDefinition, root.Category.ApiNameValue, root.Category.ApiNameValueList, root.Category.ApiHierarchyList);
  }
}(this, function(ApiClient, ApiId, ApiCategoryDefinition, ApiNameValue, ApiNameValueList, ApiHierarchyList) {
  'use strict';

  /**
   * Category service.
   * @module api/CategoryApi
   * @version v1
   */

  /**
   * Constructs a new CategoryApi. 
   * @alias module:api/CategoryApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the categoryCategoryDeleteCategoryDefinition operation.
     * @callback module:api/CategoryApi~categoryCategoryDeleteCategoryDefinitionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * deleteCategoryDefinition
     * &lt;b&gt;category.category.deleteCategoryDefinition&lt;/b&gt;&lt;/p&gt;delete Category Definition
     * @param {String} libraryId library unique ID
     * @param {String} categoryId category definition unique ID
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.securityCode security access via string
     * @param {module:api/CategoryApi~categoryCategoryDeleteCategoryDefinitionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.categoryCategoryDeleteCategoryDefinition = function(libraryId, categoryId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'libraryId' is set
      if (libraryId == undefined || libraryId == null) {
        throw "Missing the required parameter 'libraryId' when calling categoryCategoryDeleteCategoryDefinition";
      }

      // verify the required parameter 'categoryId' is set
      if (categoryId == undefined || categoryId == null) {
        throw "Missing the required parameter 'categoryId' when calling categoryCategoryDeleteCategoryDefinition";
      }


      var pathParams = {
        'libraryId': libraryId,
        'categoryId': categoryId
      };
      var queryParams = {
        'fields': opts['fields'],
        'domain': opts['domain'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;

      return this.apiClient.callApi(
        '/v1/libraries/{libraryId}/categories/{categoryId}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the categoryCategoryDeleteCategoryValue operation.
     * @callback module:api/CategoryApi~categoryCategoryDeleteCategoryValueCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * deleteCategoryValue
     * &lt;b&gt;category.category.deleteCategoryValue&lt;/b&gt;&lt;/p&gt;delete category value
     * @param {String} libraryId library unique ID
     * @param {String} categoryId category definition unique ID
     * @param {String} categoryValueId the category value to be deleted
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.securityCode security access via string
     * @param {module:api/CategoryApi~categoryCategoryDeleteCategoryValueCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.categoryCategoryDeleteCategoryValue = function(libraryId, categoryId, categoryValueId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'libraryId' is set
      if (libraryId == undefined || libraryId == null) {
        throw "Missing the required parameter 'libraryId' when calling categoryCategoryDeleteCategoryValue";
      }

      // verify the required parameter 'categoryId' is set
      if (categoryId == undefined || categoryId == null) {
        throw "Missing the required parameter 'categoryId' when calling categoryCategoryDeleteCategoryValue";
      }

      // verify the required parameter 'categoryValueId' is set
      if (categoryValueId == undefined || categoryValueId == null) {
        throw "Missing the required parameter 'categoryValueId' when calling categoryCategoryDeleteCategoryValue";
      }


      var pathParams = {
        'libraryId': libraryId,
        'categoryId': categoryId,
        'categoryValueId': categoryValueId
      };
      var queryParams = {
        'fields': opts['fields'],
        'domain': opts['domain'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;

      return this.apiClient.callApi(
        '/v1/libraries/{libraryId}/categories/{categoryId}/values/{categoryValueId}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the categoryCategoryInsertCategoryDefinition operation.
     * @callback module:api/CategoryApi~categoryCategoryInsertCategoryDefinitionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiId} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * insertCategoryDefinition
     * &lt;b&gt;category.category.insertCategoryDefinition&lt;/b&gt;&lt;/p&gt;insert a new category definition value
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.securityCode security access via string
     * @param {module:model/ApiCategoryDefinition} opts.resource 
     * @param {module:api/CategoryApi~categoryCategoryInsertCategoryDefinitionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ApiId}
     */
    this.categoryCategoryInsertCategoryDefinition = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['resource'];


      var pathParams = {
      };
      var queryParams = {
        'fields': opts['fields'],
        'domain': opts['domain'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = ApiId;

      return this.apiClient.callApi(
        '/v1', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the categoryCategoryInsertChildCategoryValue operation.
     * @callback module:api/CategoryApi~categoryCategoryInsertChildCategoryValueCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiNameValue} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * insertChildCategoryValue
     * &lt;b&gt;category.category.insertChildCategoryValue&lt;/b&gt;&lt;/p&gt;insert a child category value
     * @param {String} libraryId library unique ID
     * @param {String} categoryId category definition unique ID
     * @param {String} categoryValueName the name of the new category value
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.parentCategoryValueId the category value under which we eant to insert
     * @param {String} opts.securityCode security access via string
     * @param {module:api/CategoryApi~categoryCategoryInsertChildCategoryValueCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ApiNameValue}
     */
    this.categoryCategoryInsertChildCategoryValue = function(libraryId, categoryId, categoryValueName, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'libraryId' is set
      if (libraryId == undefined || libraryId == null) {
        throw "Missing the required parameter 'libraryId' when calling categoryCategoryInsertChildCategoryValue";
      }

      // verify the required parameter 'categoryId' is set
      if (categoryId == undefined || categoryId == null) {
        throw "Missing the required parameter 'categoryId' when calling categoryCategoryInsertChildCategoryValue";
      }

      // verify the required parameter 'categoryValueName' is set
      if (categoryValueName == undefined || categoryValueName == null) {
        throw "Missing the required parameter 'categoryValueName' when calling categoryCategoryInsertChildCategoryValue";
      }


      var pathParams = {
        'libraryId': libraryId,
        'categoryId': categoryId
      };
      var queryParams = {
        'fields': opts['fields'],
        'categoryValueName': categoryValueName,
        'domain': opts['domain'],
        'parentCategoryValueId': opts['parentCategoryValueId'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = ApiNameValue;

      return this.apiClient.callApi(
        '/v1/libraries/{libraryId}/categories/{categoryId}/values', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the categoryCategoryListCategoryDefinitions operation.
     * @callback module:api/CategoryApi~categoryCategoryListCategoryDefinitionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiNameValueList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * listCategoryDefinitions
     * &lt;b&gt;category.category.listCategoryDefinitions&lt;/b&gt;&lt;/p&gt;list Category Definitions in a library
     * @param {String} libraryId library unique ID
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.securityCode security access via string
     * @param {module:api/CategoryApi~categoryCategoryListCategoryDefinitionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ApiNameValueList}
     */
    this.categoryCategoryListCategoryDefinitions = function(libraryId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'libraryId' is set
      if (libraryId == undefined || libraryId == null) {
        throw "Missing the required parameter 'libraryId' when calling categoryCategoryListCategoryDefinitions";
      }


      var pathParams = {
        'libraryId': libraryId
      };
      var queryParams = {
        'fields': opts['fields'],
        'domain': opts['domain'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = ApiNameValueList;

      return this.apiClient.callApi(
        '/v1/libraries/{libraryId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the categoryCategoryListChildCategoryValues operation.
     * @callback module:api/CategoryApi~categoryCategoryListChildCategoryValuesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiNameValueList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * listChildCategoryValues
     * &lt;b&gt;category.category.listChildCategoryValues&lt;/b&gt;&lt;/p&gt;list of child category values from a category for a category value
     * @param {String} libraryId library unique ID
     * @param {String} categoryId category definition unique ID
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.parentCategoryValueId category value for which children are returned
     * @param {String} opts.securityCode security access via string
     * @param {module:api/CategoryApi~categoryCategoryListChildCategoryValuesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ApiNameValueList}
     */
    this.categoryCategoryListChildCategoryValues = function(libraryId, categoryId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'libraryId' is set
      if (libraryId == undefined || libraryId == null) {
        throw "Missing the required parameter 'libraryId' when calling categoryCategoryListChildCategoryValues";
      }

      // verify the required parameter 'categoryId' is set
      if (categoryId == undefined || categoryId == null) {
        throw "Missing the required parameter 'categoryId' when calling categoryCategoryListChildCategoryValues";
      }


      var pathParams = {
        'libraryId': libraryId,
        'categoryId': categoryId
      };
      var queryParams = {
        'fields': opts['fields'],
        'domain': opts['domain'],
        'parentCategoryValueId': opts['parentCategoryValueId'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = ApiNameValueList;

      return this.apiClient.callApi(
        '/v1/libraries/{libraryId}/categories/{categoryId}/values', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the categoryCategoryListHierarchyCategoryValues operation.
     * @callback module:api/CategoryApi~categoryCategoryListHierarchyCategoryValuesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiHierarchyList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * listHierarchyCategoryValues
     * &lt;b&gt;category.category.listHierarchyCategoryValues&lt;/b&gt;&lt;/p&gt;hierarchical list of category values from a category
     * @param {String} libraryId library unique ID
     * @param {String} categoryId category definition unique ID
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.securityCode security access via string
     * @param {module:api/CategoryApi~categoryCategoryListHierarchyCategoryValuesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ApiHierarchyList}
     */
    this.categoryCategoryListHierarchyCategoryValues = function(libraryId, categoryId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'libraryId' is set
      if (libraryId == undefined || libraryId == null) {
        throw "Missing the required parameter 'libraryId' when calling categoryCategoryListHierarchyCategoryValues";
      }

      // verify the required parameter 'categoryId' is set
      if (categoryId == undefined || categoryId == null) {
        throw "Missing the required parameter 'categoryId' when calling categoryCategoryListHierarchyCategoryValues";
      }


      var pathParams = {
        'libraryId': libraryId,
        'categoryId': categoryId
      };
      var queryParams = {
        'fields': opts['fields'],
        'domain': opts['domain'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = ApiHierarchyList;

      return this.apiClient.callApi(
        '/v1/libraries/{libraryId}/categories/{categoryId}/allvalueshierarchy', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the categoryCategoryLoadCategoryDefinition operation.
     * @callback module:api/CategoryApi~categoryCategoryLoadCategoryDefinitionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiCategoryDefinition} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * loadCategoryDefinition
     * &lt;b&gt;category.category.loadCategoryDefinition&lt;/b&gt;&lt;/p&gt;Load category definition
     * @param {String} libraryId library unique ID
     * @param {String} categoryId category definition unique ID
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.securityCode security access via string
     * @param {module:api/CategoryApi~categoryCategoryLoadCategoryDefinitionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ApiCategoryDefinition}
     */
    this.categoryCategoryLoadCategoryDefinition = function(libraryId, categoryId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'libraryId' is set
      if (libraryId == undefined || libraryId == null) {
        throw "Missing the required parameter 'libraryId' when calling categoryCategoryLoadCategoryDefinition";
      }

      // verify the required parameter 'categoryId' is set
      if (categoryId == undefined || categoryId == null) {
        throw "Missing the required parameter 'categoryId' when calling categoryCategoryLoadCategoryDefinition";
      }


      var pathParams = {
        'libraryId': libraryId,
        'categoryId': categoryId
      };
      var queryParams = {
        'fields': opts['fields'],
        'domain': opts['domain'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = ApiCategoryDefinition;

      return this.apiClient.callApi(
        '/v1/libraries/{libraryId}/categories/{categoryId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the categoryCategoryPatchCategoryDefinition operation.
     * @callback module:api/CategoryApi~categoryCategoryPatchCategoryDefinitionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * patchCategoryDefinition
     * &lt;b&gt;category.category.patchCategoryDefinition&lt;/b&gt;&lt;/p&gt;patch category definition - partial information - empty fields in input will be left as they are
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.securityCode security access via string
     * @param {module:model/ApiCategoryDefinition} opts.resource 
     * @param {module:api/CategoryApi~categoryCategoryPatchCategoryDefinitionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.categoryCategoryPatchCategoryDefinition = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['resource'];


      var pathParams = {
      };
      var queryParams = {
        'fields': opts['fields'],
        'domain': opts['domain'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;

      return this.apiClient.callApi(
        '/v1', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the categoryCategoryPatchCategoryValue operation.
     * @callback module:api/CategoryApi~categoryCategoryPatchCategoryValueCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * patchCategoryValue
     * &lt;b&gt;category.category.patchCategoryValue&lt;/b&gt;&lt;/p&gt;modify category value
     * @param {String} libraryId 
     * @param {String} categoryId 
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.securityCode 
     * @param {module:model/ApiNameValue} opts.resource 
     * @param {module:api/CategoryApi~categoryCategoryPatchCategoryValueCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.categoryCategoryPatchCategoryValue = function(libraryId, categoryId, opts, callback) {
      opts = opts || {};
      var postBody = opts['resource'];

      // verify the required parameter 'libraryId' is set
      if (libraryId == undefined || libraryId == null) {
        throw "Missing the required parameter 'libraryId' when calling categoryCategoryPatchCategoryValue";
      }

      // verify the required parameter 'categoryId' is set
      if (categoryId == undefined || categoryId == null) {
        throw "Missing the required parameter 'categoryId' when calling categoryCategoryPatchCategoryValue";
      }


      var pathParams = {
        'libraryId': libraryId,
        'categoryId': categoryId
      };
      var queryParams = {
        'fields': opts['fields'],
        'domain': opts['domain'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;

      return this.apiClient.callApi(
        '/v1/libraries/{libraryId}/categories/{categoryId}/values', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the categoryCategoryUpdateCategoryDefinition operation.
     * @callback module:api/CategoryApi~categoryCategoryUpdateCategoryDefinitionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * updateCategoryDefinition
     * &lt;b&gt;category.category.updateCategoryDefinition&lt;/b&gt;&lt;/p&gt;update category definition - partial information - empty fields in input will be set to null
     * @param {Object} opts Optional parameters
     * @param {String} opts.fields Selector specifying which fields to include in a partial response.
     * @param {String} opts.domain 
     * @param {String} opts.securityCode security access via string
     * @param {module:model/ApiCategoryDefinition} opts.resource 
     * @param {module:api/CategoryApi~categoryCategoryUpdateCategoryDefinitionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.categoryCategoryUpdateCategoryDefinition = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['resource'];


      var pathParams = {
      };
      var queryParams = {
        'fields': opts['fields'],
        'domain': opts['domain'],
        'securityCode': opts['securityCode']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Oauth2'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;

      return this.apiClient.callApi(
        '/v1', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
