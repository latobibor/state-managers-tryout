const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // a breaking API change in CSS loader means we have to use the latest alpha version of less loader
  addLessLoader({
    javascriptEnabled: true,
    // things that can be overridden: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
    // modifyVars: {
    //   '@primary-color': '#f48549',
    // }
  })
);
