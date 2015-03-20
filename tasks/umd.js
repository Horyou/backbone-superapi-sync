module.exports = {
  lib: {
    template: 'umd',
    indent: '  ',
    src: 'lib/<%= pkg.name.replace(/.js$/, "") %>.js',
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
    returnExportsGlobal: 'backbone-superapi-sync',
    deps: {
      default: [],
      amd: [],
      cjs: [],
      global: []
    }
  }
};
