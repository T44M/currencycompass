const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@expo/vector-icons']
    }
  }, argv);

  // Resolve設定
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'crypto': require.resolve('crypto-browserify'),
      'stream': require.resolve('stream-browserify'),
      'path': require.resolve('path-browserify'),
      'fs': false,
      './polyfills': path.resolve(__dirname, 'src/polyfills.js'),
      'react-native-get-random-values': path.resolve(__dirname, 'node_modules/react-native-get-random-values/index.web.js'),
    },
    fallback: {
      ...config.resolve.fallback,
      'vm': require.resolve('vm-browserify')
    }
  };

  // 最適化設定
  config.optimization = {
    ...config.optimization,
    usedExports: true,
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
    },
  };

  // Analyzerプラグイン設定
  if (process.env.ANALYZE === 'true') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'report.html',
        generateStatsFile: true,
        statsFilename: 'stats.json',
      })
    );
  }

  return config;
};