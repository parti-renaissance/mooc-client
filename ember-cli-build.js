'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'node_modules/include-media/dist'
      ]
    },
    fingerprint: {
      enabled: EmberApp.env() === 'production' || process.env.DEPLOY_TARGET,
      prepend: `${process.env.GCS_STATIC_HOST}/${process.env.GCS_BUCKET}/`,
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg', 'eot', 'ttf', 'woff2', 'woff']
    },
  });

  app.import('node_modules/normalize.css/normalize.css');

  return app.toTree();
};
