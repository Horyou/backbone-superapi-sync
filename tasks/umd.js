module.exports = {
  lib: {
    template: 'umd',
    src: 'lib/<%= pkg.name.replace(/.js$/, "") %>.js',
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
    objectToExport: 'Backbone.superapiSync',
    deps: {
      default: ['backbone'],
      amd: ['backbone'],
      cjs: ['backbone'],
      global: ['Backbone']
    }
  }
};
