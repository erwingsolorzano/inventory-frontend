const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Disable fully-specified imports
      webpackConfig.resolve.fullySpecified = false;
      
      // Set the alias to the directory instead of the index file.
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@mui/material/utils': path.resolve(__dirname, 'node_modules', '@mui', 'material', 'utils'),
      };

      return webpackConfig;
    },
  },
};
