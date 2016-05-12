# Category.CategoryApi

All URIs are relative to *https://beta-dot-ao-docs-staging.appspot.com/_ah/api/category*

Method | HTTP request | Description
------------- | ------------- | -------------
[**categoryCategoryDeleteCategoryDefinition**](CategoryApi.md#categoryCategoryDeleteCategoryDefinition) | **DELETE** /v1/libraries/{libraryId}/categories/{categoryId} | deleteCategoryDefinition
[**categoryCategoryDeleteCategoryValue**](CategoryApi.md#categoryCategoryDeleteCategoryValue) | **DELETE** /v1/libraries/{libraryId}/categories/{categoryId}/values/{categoryValueId} | deleteCategoryValue
[**categoryCategoryInsertCategoryDefinition**](CategoryApi.md#categoryCategoryInsertCategoryDefinition) | **PUT** /v1 | insertCategoryDefinition
[**categoryCategoryInsertChildCategoryValue**](CategoryApi.md#categoryCategoryInsertChildCategoryValue) | **PUT** /v1/libraries/{libraryId}/categories/{categoryId}/values | insertChildCategoryValue
[**categoryCategoryListCategoryDefinitions**](CategoryApi.md#categoryCategoryListCategoryDefinitions) | **GET** /v1/libraries/{libraryId} | listCategoryDefinitions
[**categoryCategoryListChildCategoryValues**](CategoryApi.md#categoryCategoryListChildCategoryValues) | **GET** /v1/libraries/{libraryId}/categories/{categoryId}/values | listChildCategoryValues
[**categoryCategoryListHierarchyCategoryValues**](CategoryApi.md#categoryCategoryListHierarchyCategoryValues) | **GET** /v1/libraries/{libraryId}/categories/{categoryId}/allvalueshierarchy | listHierarchyCategoryValues
[**categoryCategoryLoadCategoryDefinition**](CategoryApi.md#categoryCategoryLoadCategoryDefinition) | **GET** /v1/libraries/{libraryId}/categories/{categoryId} | loadCategoryDefinition
[**categoryCategoryPatchCategoryDefinition**](CategoryApi.md#categoryCategoryPatchCategoryDefinition) | **PATCH** /v1 | patchCategoryDefinition
[**categoryCategoryPatchCategoryValue**](CategoryApi.md#categoryCategoryPatchCategoryValue) | **PATCH** /v1/libraries/{libraryId}/categories/{categoryId}/values | patchCategoryValue
[**categoryCategoryUpdateCategoryDefinition**](CategoryApi.md#categoryCategoryUpdateCategoryDefinition) | **POST** /v1 | updateCategoryDefinition


<a name="categoryCategoryDeleteCategoryDefinition"></a>
# **categoryCategoryDeleteCategoryDefinition**
> categoryCategoryDeleteCategoryDefinition(libraryId, categoryId, opts)

deleteCategoryDefinition

&lt;b&gt;category.category.deleteCategoryDefinition&lt;/b&gt;&lt;/p&gt;delete Category Definition

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var libraryId = "libraryId_example"; // String | library unique ID

var categoryId = "categoryId_example"; // String | category definition unique ID

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'securityCode': "securityCode_example" // String | security access via string
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.categoryCategoryDeleteCategoryDefinition(libraryId, categoryId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **libraryId** | **String**| library unique ID | 
 **categoryId** | **String**| category definition unique ID | 
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **securityCode** | **String**| security access via string | [optional] 

### Return type

null (empty response body)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="categoryCategoryDeleteCategoryValue"></a>
# **categoryCategoryDeleteCategoryValue**
> categoryCategoryDeleteCategoryValue(libraryId, categoryId, categoryValueId, opts)

deleteCategoryValue

&lt;b&gt;category.category.deleteCategoryValue&lt;/b&gt;&lt;/p&gt;delete category value

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var libraryId = "libraryId_example"; // String | library unique ID

var categoryId = "categoryId_example"; // String | category definition unique ID

var categoryValueId = "categoryValueId_example"; // String | the category value to be deleted

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'securityCode': "securityCode_example" // String | security access via string
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.categoryCategoryDeleteCategoryValue(libraryId, categoryId, categoryValueId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **libraryId** | **String**| library unique ID | 
 **categoryId** | **String**| category definition unique ID | 
 **categoryValueId** | **String**| the category value to be deleted | 
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **securityCode** | **String**| security access via string | [optional] 

### Return type

null (empty response body)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="categoryCategoryInsertCategoryDefinition"></a>
# **categoryCategoryInsertCategoryDefinition**
> ApiId categoryCategoryInsertCategoryDefinition(opts)

insertCategoryDefinition

&lt;b&gt;category.category.insertCategoryDefinition&lt;/b&gt;&lt;/p&gt;insert a new category definition value

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'securityCode': "securityCode_example", // String | security access via string
  'resource': new Category.ApiCategoryDefinition() // ApiCategoryDefinition | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.categoryCategoryInsertCategoryDefinition(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **securityCode** | **String**| security access via string | [optional] 
 **resource** | [**ApiCategoryDefinition**](ApiCategoryDefinition.md)|  | [optional] 

### Return type

[**ApiId**](ApiId.md)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="categoryCategoryInsertChildCategoryValue"></a>
# **categoryCategoryInsertChildCategoryValue**
> ApiNameValue categoryCategoryInsertChildCategoryValue(libraryId, categoryId, categoryValueName, opts)

insertChildCategoryValue

&lt;b&gt;category.category.insertChildCategoryValue&lt;/b&gt;&lt;/p&gt;insert a child category value

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var libraryId = "libraryId_example"; // String | library unique ID

var categoryId = "categoryId_example"; // String | category definition unique ID

var categoryValueName = "categoryValueName_example"; // String | the name of the new category value

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'parentCategoryValueId': "parentCategoryValueId_example", // String | the category value under which we eant to insert
  'securityCode': "securityCode_example" // String | security access via string
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.categoryCategoryInsertChildCategoryValue(libraryId, categoryId, categoryValueName, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **libraryId** | **String**| library unique ID | 
 **categoryId** | **String**| category definition unique ID | 
 **categoryValueName** | **String**| the name of the new category value | 
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **parentCategoryValueId** | **String**| the category value under which we eant to insert | [optional] 
 **securityCode** | **String**| security access via string | [optional] 

### Return type

[**ApiNameValue**](ApiNameValue.md)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="categoryCategoryListCategoryDefinitions"></a>
# **categoryCategoryListCategoryDefinitions**
> ApiNameValueList categoryCategoryListCategoryDefinitions(libraryId, opts)

listCategoryDefinitions

&lt;b&gt;category.category.listCategoryDefinitions&lt;/b&gt;&lt;/p&gt;list Category Definitions in a library

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var libraryId = "libraryId_example"; // String | library unique ID

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'securityCode': "securityCode_example" // String | security access via string
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.categoryCategoryListCategoryDefinitions(libraryId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **libraryId** | **String**| library unique ID | 
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **securityCode** | **String**| security access via string | [optional] 

### Return type

[**ApiNameValueList**](ApiNameValueList.md)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="categoryCategoryListChildCategoryValues"></a>
# **categoryCategoryListChildCategoryValues**
> ApiNameValueList categoryCategoryListChildCategoryValues(libraryId, categoryId, opts)

listChildCategoryValues

&lt;b&gt;category.category.listChildCategoryValues&lt;/b&gt;&lt;/p&gt;list of child category values from a category for a category value

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var libraryId = "libraryId_example"; // String | library unique ID

var categoryId = "categoryId_example"; // String | category definition unique ID

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'parentCategoryValueId': "parentCategoryValueId_example", // String | category value for which children are returned
  'securityCode': "securityCode_example" // String | security access via string
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.categoryCategoryListChildCategoryValues(libraryId, categoryId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **libraryId** | **String**| library unique ID | 
 **categoryId** | **String**| category definition unique ID | 
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **parentCategoryValueId** | **String**| category value for which children are returned | [optional] 
 **securityCode** | **String**| security access via string | [optional] 

### Return type

[**ApiNameValueList**](ApiNameValueList.md)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="categoryCategoryListHierarchyCategoryValues"></a>
# **categoryCategoryListHierarchyCategoryValues**
> ApiHierarchyList categoryCategoryListHierarchyCategoryValues(libraryId, categoryId, opts)

listHierarchyCategoryValues

&lt;b&gt;category.category.listHierarchyCategoryValues&lt;/b&gt;&lt;/p&gt;hierarchical list of category values from a category

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var libraryId = "libraryId_example"; // String | library unique ID

var categoryId = "categoryId_example"; // String | category definition unique ID

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'securityCode': "securityCode_example" // String | security access via string
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.categoryCategoryListHierarchyCategoryValues(libraryId, categoryId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **libraryId** | **String**| library unique ID | 
 **categoryId** | **String**| category definition unique ID | 
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **securityCode** | **String**| security access via string | [optional] 

### Return type

[**ApiHierarchyList**](ApiHierarchyList.md)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="categoryCategoryLoadCategoryDefinition"></a>
# **categoryCategoryLoadCategoryDefinition**
> ApiCategoryDefinition categoryCategoryLoadCategoryDefinition(libraryId, categoryId, opts)

loadCategoryDefinition

&lt;b&gt;category.category.loadCategoryDefinition&lt;/b&gt;&lt;/p&gt;Load category definition

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var libraryId = "libraryId_example"; // String | library unique ID

var categoryId = "categoryId_example"; // String | category definition unique ID

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'securityCode': "securityCode_example" // String | security access via string
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.categoryCategoryLoadCategoryDefinition(libraryId, categoryId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **libraryId** | **String**| library unique ID | 
 **categoryId** | **String**| category definition unique ID | 
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **securityCode** | **String**| security access via string | [optional] 

### Return type

[**ApiCategoryDefinition**](ApiCategoryDefinition.md)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="categoryCategoryPatchCategoryDefinition"></a>
# **categoryCategoryPatchCategoryDefinition**
> categoryCategoryPatchCategoryDefinition(opts)

patchCategoryDefinition

&lt;b&gt;category.category.patchCategoryDefinition&lt;/b&gt;&lt;/p&gt;patch category definition - partial information - empty fields in input will be left as they are

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'securityCode': "securityCode_example", // String | security access via string
  'resource': new Category.ApiCategoryDefinition() // ApiCategoryDefinition | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.categoryCategoryPatchCategoryDefinition(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **securityCode** | **String**| security access via string | [optional] 
 **resource** | [**ApiCategoryDefinition**](ApiCategoryDefinition.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="categoryCategoryPatchCategoryValue"></a>
# **categoryCategoryPatchCategoryValue**
> categoryCategoryPatchCategoryValue(libraryId, categoryId, opts)

patchCategoryValue

&lt;b&gt;category.category.patchCategoryValue&lt;/b&gt;&lt;/p&gt;modify category value

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var libraryId = "libraryId_example"; // String | 

var categoryId = "categoryId_example"; // String | 

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'securityCode': "securityCode_example", // String | 
  'resource': new Category.ApiNameValue() // ApiNameValue | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.categoryCategoryPatchCategoryValue(libraryId, categoryId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **libraryId** | **String**|  | 
 **categoryId** | **String**|  | 
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **securityCode** | **String**|  | [optional] 
 **resource** | [**ApiNameValue**](ApiNameValue.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="categoryCategoryUpdateCategoryDefinition"></a>
# **categoryCategoryUpdateCategoryDefinition**
> categoryCategoryUpdateCategoryDefinition(opts)

updateCategoryDefinition

&lt;b&gt;category.category.updateCategoryDefinition&lt;/b&gt;&lt;/p&gt;update category definition - partial information - empty fields in input will be set to null

### Example
```javascript
var Category = require('category');
var defaultClient = Category.ApiClient.default;

// Configure OAuth2 access token for authorization: Oauth2
var Oauth2 = defaultClient.authentications['Oauth2'];
Oauth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Category.CategoryApi();

var opts = { 
  'fields': "fields_example", // String | Selector specifying which fields to include in a partial response.
  'domain': "domain_example", // String | 
  'securityCode': "securityCode_example", // String | security access via string
  'resource': new Category.ApiCategoryDefinition() // ApiCategoryDefinition | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.categoryCategoryUpdateCategoryDefinition(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fields** | **String**| Selector specifying which fields to include in a partial response. | [optional] 
 **domain** | **String**|  | [optional] 
 **securityCode** | **String**| security access via string | [optional] 
 **resource** | [**ApiCategoryDefinition**](ApiCategoryDefinition.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Oauth2](../README.md#Oauth2)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

