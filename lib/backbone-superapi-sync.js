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
