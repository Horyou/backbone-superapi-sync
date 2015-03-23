/*! backbone-superapi-sync - v0.0.0
 *  Release on: 2015-03-23
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

var methodMap = {
  create: 'post',
  update: 'put',
  delete: 'delete',
  read: 'get'
};

Backbone.superapiSync = function (superapi) {
  return function (method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}));

    // Ensure that we have a URL.
    var url = options.url ? options.url : _.result(model, 'url') || urlError();
    var params = {
      type: 'json'
    };

    var req = superapi.sendRequest(type, url, JSON.stringify(options.attrs || model.toJSON(options)), params);

    req.end(function (res) {
      (!res.error ? options.success : options.error)(res.body || {});
    });

    model.trigger('request', model, req.xhr, options);
    return req.xhr;
  };
};

return Backbone.superapiSync;

}));
