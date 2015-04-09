/*! backbone-superapi-sync - v0.4.0
 *  Release on: 2015-04-09
 *  Copyright (c) 2015 Stéphane Bachelier
 *  Licensed MIT */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["backbone"], function (a0) {
      return (root['Backbone.superapiSync'] = factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("backbone"));
  } else {
    root['Backbone.superapiSync'] = factory(Backbone);
  }
}(this, function (backbone) {

'use strict';

// jscs:disable disallowQuotedKeysInObjects
var methodMap = {
  'create': 'post',
  'update': 'put',
  'delete': 'delete',
  'read': 'get'
};
// jscs:enable disallowQuotedKeysInObjects

Backbone.superapiSync = function (superapi, service) {
  return function (method, model, options) {
    var httpMethod = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}));

    // Ensure that we have a URL.
    var url = options.url ? options.url : _.result(model, 'url') || urlError();

    var params = {
      headers: _.defaults({}, service ? service.headers : {}, options.headers),
      options: _.defaults({}, service ? service.options : {}, options.options)
    };

    var data = method !== 'read' ? options.attrs || model.toJSON(options) : {};

    var req = superapi.sendRequest(httpMethod, url, data, params);

    req.on('error', Backbone.superapiSync.onError);

    req.on('abort', Backbone.superapiSync.onAbort);

    req.end(function (res) {
      (!res.error ? options.success : options.error)(res.body || {});
    });

    model.trigger('request', model, req.xhr, options);
    return req.xhr;
  };
};

// jshint unused:false
Backbone.superapiSync.onError = function (err) {};
// jshint unused:true

Backbone.superapiSync.onAbort = function () {};

return Backbone.superapiSync;

}));
