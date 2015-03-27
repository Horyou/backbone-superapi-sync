# backbone-superapi-sync

[![Build Status](https://secure.travis-ci.org/stephanebachelier/backbone-superapi-sync.png?branch=master)](http://travis-ci.org/stephanebachelier/backbone-superapi-sync)

Override Backbone.sync with [superapi](https://github.com/stephanebachelier/superapi.git) power, which is a lightweight configurable wrapper on top of [superagent](https://github.com/visionmedia/superagent.git).


This (nano) library does not require itself superapi as you must provide your superapi instance. Indeed you may provide your own implementation of superapi which is ridiculously easy if you don't want superapi configuration power.

## Installation

```
$ npm install --save-dev backbone-superapi-sync
```

## Usage

Let's say you have a `comments` web service and that you use `superapi` to configure all your remote api calls.

```js
// basic superapi configuration, see superapi README for help
var api = superapi.default({
  baseUrl: 'http://foo.tld/path',
  services: {
    comments: {
      path: 'foo'
    }
  },
  //
  options: {
    type: 'json'
  }
})

// attach superagent to superapi
// you could also provide your own implementation!
api.agent = superagent;

// the sync function only need to have a reference to your superapi instance
// with an optional service. If you don't provide a service you may use the options
// object to pass any headers or options to superapi.
var Comment = Backbone.Model.extend({
  sync: backboneSuperapiSync(api, 'comments'),
};

var comment = new Comment({
  title: 'My awesome comment',
  body: 'This is not a comment body',
  author: 'me'
});

comment.save();
```
This will make a POST call to http://foo.tld/path/foo

## Not using a superapi service

Given the previous example, it's easy to not provide a service. You may only lose some superapi power, but you may have some use case where it's better to have more control, like in some dynamic context. It's as easy:

```js
var Comment = Backbone.Model.extend({
  sync: backboneSuperapiSync(api),
};

var comment = new Comment({
  title: 'My awesome comment',
  body: 'This is not a comment body',
  author: 'me'
});

comment.save(null, {
  headers: {
    'X-FOO': 'bar'
  },
  options: {
    type: 'form'
  }
});

```

## Overriding superapi

Yes it's possible an easy to provide your own implementation.

```js
var req = superapi.sendRequest(httpMethod, url, data, params);

req.end(function (res) {
  (!res.error ? options.success : options.error)(res.body || {});
});
```

`req` is an instance of superagent `Request` so your `sendRequest` function only need to provide the following:

- httpMethod: any of the following HTTP word supported by superagent GET, POST, PUT, DELETE, PATCH, HEAD
- url: the url of the remote service
- data: the data to be sent with the request
- params: is a hash with `headers` and `options` in the has of `superagent`. You might completly ignore this last field.


## License

MIT
