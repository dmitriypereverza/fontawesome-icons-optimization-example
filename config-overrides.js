const ProgressPlugin = require('webpack').ProgressPlugin;
const { override, addWebpackPlugin } = require('customize-cra');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (config, env) => {
  return override(
    addWebpackPlugin(
      new ProgressPlugin({
        entries: false,
        modules: true,
        activeModules: false,
      })
    ),
    addWebpackPlugin(
      new BundleAnalyzerPlugin()
    )
  )(config, env);
};
