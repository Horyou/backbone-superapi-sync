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

    req.end(function (res) {
      (!res.error ? options.success : options.error)(res.body || {});
    });

    model.trigger('request', model, req.xhr, options);
    return req.xhr;
  };
};
