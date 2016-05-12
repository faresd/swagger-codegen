(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Category = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],2:[function(_dereq_,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}],3:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Emitter = _dereq_('emitter');
var reduce = _dereq_('reduce');
var requestBase = _dereq_('./request-base');
var isObject = _dereq_('./is-object');

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  root = this;
}

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = module.exports = _dereq_('./request').bind({}, Request);


function getFetcher() {
  return new Fetcher();
}


function Fetcher() {
  this.params = {};
}

Fetcher.prototype.setRequestHeader = function(field, value) {
  var headers = {};
  headers[field] = value;
  params.headers = headers;
}
Fetcher.prototype.open = function(method, url){
  this.params.method = method;
  this.url = url;
}
Fetcher.prototype.send = function(payload){
  var urlFetchApp = UrlFetchApp;
  if (payload)
    this.params.payload = payload;
  var result = urlFetchApp.fetch(this.url, this.params)
  this.result = result;
  return result;
}

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pushEncodedKeyValuePair(pairs, key, obj[key]);
    }
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (Array.isArray(val)) {
    return val.forEach(function(v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  }
  pairs.push(encodeURIComponent(key)
    + '=' + encodeURIComponent(val));
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `fetcher`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {Object} options
 * @api private
 */

function Response(fetcher, options) {
  options = options || {};
  this.fetcher = fetcher;
  this.text = fetcher.result.getContentText();
  this.setStatusProperties(fetcher.result.getResponseCode());
  this.header = this.headers = fetcher.result.getAllHeaders();
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  //this.header['content-type'] = fetcher.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.parseBody(this.text);
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = this.statusCode = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */
function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var res = new Response(self.fetcher);
    if ('HEAD' == method) res.text = null;
    self.callback(null, res);
  });
}

/**
 * Mixin `Emitter` and `requestBase`.
 */

Emitter(Request.prototype);
for (var key in requestBase) {
  Request.prototype[key] = requestBase[key];
}

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set responseType to `val`. Presently valid responseTypes are 'blob' and
 * 'arraybuffer'.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (!options) {
    options = {
      type: 'basic'
    }
  }

  switch (options.type) {
    case 'basic':
      var str = btoa(user + ':' + pass);
      this.set('Authorization', 'Basic ' + str);
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
  }
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  this._getFormData().append(field, file, filename || file.name);
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */

Request.prototype._appendQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var fetcher = this.fetcher = getFetcher()
  var query = this._query.join('&');
  var data = this._data;

  // store callback
  this._callback = fn || noop;

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
        ? '&' + query
        : '?' + query;
  }

  // initiate request
  fetcher.open(this.method, this.url, true);

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var serialize = request.serialize[this.getHeader('Content-Type')];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    fetcher.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  var result = fetcher.send(data);
  this.fetcher.result = result;

  self.emit('end');
  return this;
};

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *x
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

function del(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-object":4,"./request":6,"./request-base":5,"emitter":1,"reduce":2}],4:[function(_dereq_,module,exports){
/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null != obj && 'object' == typeof obj;
}

module.exports = isObject;

},{}],5:[function(_dereq_,module,exports){
/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = _dereq_('./is-object');

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

exports.clearTimeout = function _clearTimeout(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

exports.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

exports.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

exports.timeout = function timeout(ms){
  this._timeout = ms;
  return this;
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} reject
 * @return {Request}
 */

exports.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

/**
 * Allow for extension
 */

exports.use = function use(fn) {
  fn(this);
  return this;
}


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

exports.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

exports.getHeader = exports.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

exports.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
exports.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
exports.field = function(name, val) {
  this._getFormData().append(name, val);
  return this;
};


/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

exports.withCredentials = function(){
  // This is browser-only functionality. Node side is no-op.
  this._withCredentials = true;
  return this;
};


/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

exports.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data
  };
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

exports._isHost = function _isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

exports.send = function(data){
  var obj = isObject(data);
  var type = this._header['content-type'];

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || this._isHost(data)) return this;

  // default to json
  if (!type) this.type('json');
  return this;
};

},{"./is-object":4}],6:[function(_dereq_,module,exports){
// The node and browser modules expose versions of this with the
// appropriate constructor function bound as first argument
/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(RequestConstructor, method, url) {
  // callback
  if ('function' == typeof url) {
    return new RequestConstructor('GET', method).end(url);
  }

  // url first
  if (2 == arguments.length) {
    return new RequestConstructor('GET', method);
  }

  return new RequestConstructor(method, url);
}

module.exports = request;

},{}],7:[function(_dereq_,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['superagent'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(_dereq_('superagent'));
  } else {
    // Browser globals (root is window)
    if (!root.Category) {
      root.Category = {};
    }
    root.Category.ApiClient = factory(root.superagent);
  }
}(this, function(superagent) {
  'use strict';

  /**
   * @module ApiClient
   * @version v1
   */

  /**
   * Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
   * application to use this class directly - the *Api and model classes provide the public API for the service. The
   * contents of this file should be regarded as internal but are documented for completeness.
   * @alias module:ApiClient
   * @class
   */
  var exports = function() {
    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default https://beta-dot-ao-docs-staging.appspot.com/_ah/api/category
     */
    this.basePath = 'https://beta-dot-ao-docs-staging.appspot.com/_ah/api/category'.replace(/\/+$/, '');

    /**
     * The authentication methods to be included for all API calls.
     * @type {Array.<String>}
     */
    this.authentications = {
      'Oauth2': {type: 'oauth2'}
    };
    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */
    this.defaultHeaders = {};

    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */
    this.timeout = 60000;
  };

  /**
   * Returns a string representation for an actual parameter.
   * @param param The actual parameter.
   * @returns {String} The string representation of <code>param</code>.
   */
  exports.prototype.paramToString = function(param) {
    if (param == undefined || param == null) {
      return '';
    }
    if (param instanceof Date) {
      return param.toJSON();
    }
    return param.toString();
  };

  /**
   * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
   * NOTE: query parameters are not handled here.
   * @param {String} path The path to append to the base URL.
   * @param {Object} pathParams The parameter values to append.
   * @returns {String} The encoded path with parameter values substituted.
   */
  exports.prototype.buildUrl = function(path, pathParams) {
    if (!path.match(/^\//)) {
      path = '/' + path;
    }
    var url = this.basePath + path;
    var _this = this;
    url = url.replace(/\{([\w-]+)\}/g, function(fullMatch, key) {
      var value;
      if (pathParams.hasOwnProperty(key)) {
        value = _this.paramToString(pathParams[key]);
      } else {
        value = fullMatch;
      }
      return encodeURIComponent(value);
    });
    return url;
  };

  /**
   * Checks whether the given content type represents JSON.<br>
   * JSON content type examples:<br>
   * <ul>
   * <li>application/json</li>
   * <li>application/json; charset=UTF8</li>
   * <li>APPLICATION/JSON</li>
   * </ul>
   * @param {String} contentType The MIME content type to check.
   * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
   */
  exports.prototype.isJsonMime = function(contentType) {
    return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
  };

  /**
   * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
   * @param {Array.<String>} contentTypes
   * @returns {String} The chosen content type, preferring JSON.
   */
  exports.prototype.jsonPreferredMime = function(contentTypes) {
    for (var i = 0; i < contentTypes.length; i++) {
      if (this.isJsonMime(contentTypes[i])) {
        return contentTypes[i];
      }
    }
    return contentTypes[0];
  };

  /**
   * Checks whether the given parameter value represents file-like content.
   * @param param The parameter to check.
   * @returns {Boolean} <code>true</code> if <code>param</code> represents a file. 
   */
  exports.prototype.isFileParam = function(param) {
    return false;
  };

  /**
   * Normalizes parameter values:
   * <ul>
   * <li>remove nils</li>
   * <li>keep files and arrays</li>
   * <li>format to string with `paramToString` for other cases</li>
   * </ul>
   * @param {Object.<String, Object>} params The parameters as object properties.
   * @returns {Object.<String, Object>} normalized parameters.
   */
  exports.prototype.normalizeParams = function(params) {
    var newParams = {};
    for (var key in params) {
      if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
        var value = params[key];
        if (this.isFileParam(value) || Array.isArray(value)) {
          newParams[key] = value;
        } else {
          newParams[key] = this.paramToString(value);
        }
      }
    }
    return newParams;
  };

  /**
   * Enumeration of collection format separator strategies.
   * @enum {String} 
   * @readonly
   */
  exports.CollectionFormatEnum = {
    /**
     * Comma-separated values. Value: <code>csv</code>
     * @const
     */
    CSV: ',',
    /**
     * Space-separated values. Value: <code>ssv</code>
     * @const
     */
    SSV: ' ',
    /**
     * Tab-separated values. Value: <code>tsv</code>
     * @const
     */
    TSV: '\t',
    /**
     * Pipe(|)-separated values. Value: <code>pipes</code>
     * @const
     */
    PIPES: '|',
    /**
     * Native array. Value: <code>multi</code>
     * @const
     */
    MULTI: 'multi'
  };

  /**
   * Builds a string representation of an array-type actual parameter, according to the given collection format.
   * @param {Array} param An array parameter.
   * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
   * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
   * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
   */
  exports.prototype.buildCollectionParam = function buildCollectionParam(param, collectionFormat) {
    if (param == null) {
      return null;
    }
    switch (collectionFormat) {
      case 'csv':
        return param.map(this.paramToString).join(',');
      case 'ssv':
        return param.map(this.paramToString).join(' ');
      case 'tsv':
        return param.map(this.paramToString).join('\t');
      case 'pipes':
        return param.map(this.paramToString).join('|');
      case 'multi':
        // return the array directly as SuperAgent will handle it as expected
        return param.map(this.paramToString);
      default:
        throw new Error('Unknown collection format: ' + collectionFormat);
    }
  };

  /**
   * Applies authentication headers to the request.
   * @param {Object} request The request object created by a <code>superagent()</code> call.
   * @param {Array.<String>} authNames An array of authentication method names.
   */
  exports.prototype.applyAuthToRequest = function(request, authNames) {
    var _this = this;
    authNames.forEach(function(authName) {
      var auth = _this.authentications[authName];
      switch (auth.type) {
        case 'basic':
          if (auth.username || auth.password) {
            request.auth(auth.username || '', auth.password || '');
          }
          break;
        case 'apiKey':
          if (auth.apiKey) {
            var data = {};
            if (auth.apiKeyPrefix) {
              data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
            } else {
              data[auth.name] = auth.apiKey;
            }
            if (auth['in'] === 'header') {
              request.set(data);
            } else {
              request.query(data);
            }
          }
          break;
        case 'oauth2':
          if (auth.accessToken) {
            request.set({'Authorization': 'Bearer ' + auth.accessToken});
          }
          break;
        default:
          throw new Error('Unknown authentication type: ' + auth.type);
      }
    });
  };

  /**
   * Deserializes an HTTP response body into a value of the specified type.
   * @param {Object} response A SuperAgent response object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns A value of the specified type.
   */
  exports.prototype.deserialize = function deserialize(response, returnType) {
    if (response == null || returnType == null) {
      return null;
    }
    // Rely on SuperAgent for parsing response body.
    // See http://visionmedia.github.io/superagent/#parsing-response-bodies
    var data = response.body;
    if (data == null) {
      // SuperAgent does not always produce a body; use the unparsed response as a fallback
      data = response.text;
    }
    return exports.convertToType(data, returnType);
  };

  /**
   * Callback function to receive the result of the operation.
   * @callback module:ApiClient~callApiCallback
   * @param {String} error Error message, if any.
   * @param data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Invokes the REST service using the supplied settings and parameters.
   * @param {String} path The base URL to invoke.
   * @param {String} httpMethod The HTTP method to use.
   * @param {Object.<String, String>} pathParams A map of path parameters and their values.
   * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
   * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
   * @param {Object.<String, Object>} formParams A map of form parameters and their values.
   * @param {Object} bodyParam The value to pass as the request body.
   * @param {Array.<String>} authNames An array of authentication type names.
   * @param {Array.<String>} contentTypes An array of request MIME types.
   * @param {Array.<String>} accepts An array of acceptable response MIME types.
   * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
   * constructor for a complex type.
   * @param {module:ApiClient~callApiCallback} callback The callback function.
   * @returns {Object} The SuperAgent request object.
   */
  exports.prototype.callApi = function callApi(path, httpMethod, pathParams,
      queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts,
      returnType, callback) {

    var _this = this;
    var url = this.buildUrl(path, pathParams);
    var request = superagent(httpMethod, url);

    // apply authentications
    this.applyAuthToRequest(request, authNames);

    // set query parameters
    request.query(this.normalizeParams(queryParams));

    // set header parameters
    request.set(this.defaultHeaders).set(this.normalizeParams(headerParams));

    // set request timeout
    request.timeout(this.timeout);

    var contentType = this.jsonPreferredMime(contentTypes);
    if (contentType) {
      request.type(contentType);
    } else if (!request.header['Content-Type']) {
      request.type('application/json');
    }

    if (contentType === 'application/x-www-form-urlencoded') {
      request.send(this.normalizeParams(formParams));
    } else if (contentType == 'multipart/form-data') {
      var _formParams = this.normalizeParams(formParams);
      for (var key in _formParams) {
        if (_formParams.hasOwnProperty(key)) {
          if (this.isFileParam(_formParams[key])) {
            // file field
            request.attach(key, _formParams[key]);
          } else {
            request.field(key, _formParams[key]);
          }
        }
      }
    } else if (bodyParam) {
      request.send(bodyParam);
    }

    var accept = this.jsonPreferredMime(accepts);
    if (accept) {
      request.accept(accept);
    }


    request.end(function(error, response) {
      if (callback) {
        var data = null;
        if (!error) {
          data = _this.deserialize(response, returnType);
        }
        callback(error, data, response);
      }
    });

    return request;
  };

  /**
   * Parses an ISO-8601 string representation of a date value.
   * @param {String} str The date value as a string.
   * @returns {Date} The parsed date object.
   */
  exports.parseDate = function(str) {
    return new Date(str.replace(/T/i, ' '));
  };

  /**
   * Converts a value to the specified type.
   * @param {(String|Object)} data The data to convert, as a string or object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns An instance of the specified type.
   */
  exports.convertToType = function(data, type) {
    switch (type) {
      case 'Boolean':
        return Boolean(data);
      case 'Integer':
        return parseInt(data, 10);
      case 'Number':
        return parseFloat(data);
      case 'String':
        return String(data);
      case 'Date':
        return this.parseDate(String(data));
      default:
        if (type === Object) {
          // generic object, return directly
          return data;
        } else if (typeof type === 'function') {
          // for model type like: User
          return type.constructFromObject(data);
        } else if (Array.isArray(type)) {
          // for array type like: ['String']
          var itemType = type[0];
          return data.map(function(item) {
            return exports.convertToType(item, itemType);
          });
        } else if (typeof type === 'object') {
          // for plain object type like: {'String': 'Integer'}
          var keyType, valueType;
          for (var k in type) {
            if (type.hasOwnProperty(k)) {
              keyType = k;
              valueType = type[k];
              break;
            }
          }
          var result = {};
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              var key = exports.convertToType(k, keyType);
              var value = exports.convertToType(data[k], valueType);
              result[key] = value;
            }
          }
          return result;
        } else {
          // for unknown type, return the data directly
          return data;
        }
    }
  };

  /**
   * The default API client implementation.
   * @type {module:ApiClient}
   */
  exports.instance = new exports();

  return exports;
}));

},{"superagent":3}],8:[function(_dereq_,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/ApiId', '../model/ApiCategoryDefinition', '../model/ApiNameValue', '../model/ApiNameValueList', '../model/ApiHierarchyList'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(_dereq_('../ApiClient'), _dereq_('../model/ApiId'), _dereq_('../model/ApiCategoryDefinition'), _dereq_('../model/ApiNameValue'), _dereq_('../model/ApiNameValueList'), _dereq_('../model/ApiHierarchyList'));
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

},{"../ApiClient":7,"../model/ApiCategoryDefinition":10,"../model/ApiHierarchyList":11,"../model/ApiId":13,"../model/ApiNameValue":14,"../model/ApiNameValueList":15}],9:[function(_dereq_,module,exports){
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['./ApiClient', './model/ApiCategoryDefinition', './model/ApiHierarchyList', './model/ApiHierarchyValue', './model/ApiId', './model/ApiNameValue', './model/ApiNameValueList', './api/CategoryApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(_dereq_('./ApiClient'), _dereq_('./model/ApiCategoryDefinition'), _dereq_('./model/ApiHierarchyList'), _dereq_('./model/ApiHierarchyValue'), _dereq_('./model/ApiId'), _dereq_('./model/ApiNameValue'), _dereq_('./model/ApiNameValueList'), _dereq_('./api/CategoryApi'));
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

},{"./ApiClient":7,"./api/CategoryApi":8,"./model/ApiCategoryDefinition":10,"./model/ApiHierarchyList":11,"./model/ApiHierarchyValue":12,"./model/ApiId":13,"./model/ApiNameValue":14,"./model/ApiNameValueList":15}],10:[function(_dereq_,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(_dereq_('../ApiClient'));
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

},{"../ApiClient":7}],11:[function(_dereq_,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './ApiHierarchyValue'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(_dereq_('../ApiClient'), _dereq_('./ApiHierarchyValue'));
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

},{"../ApiClient":7,"./ApiHierarchyValue":12}],12:[function(_dereq_,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(_dereq_('../ApiClient'));
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

},{"../ApiClient":7}],13:[function(_dereq_,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(_dereq_('../ApiClient'));
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

},{"../ApiClient":7}],14:[function(_dereq_,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(_dereq_('../ApiClient'));
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

},{"../ApiClient":7}],15:[function(_dereq_,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './ApiNameValue'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(_dereq_('../ApiClient'), _dereq_('./ApiNameValue'));
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

},{"../ApiClient":7,"./ApiNameValue":14}]},{},[9])(9)
});