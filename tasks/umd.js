module.exports = {
  lib: {
    template: 'umd',
    indent: '  ',
    src: 'lib/<%= pkg.name.replace(/.js$/, "") %>.js',
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
    returnExportsGlobal: 'Backbone.superapiSync',
    deps: {
      default: ['Backbone'],
      amd: ['Backbone'],
      cjs: ['Backbone'],
      global: ['Backbone']
    }
  }
};
