/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    gcloud: {
     bucket: process.env.GCS_BUCKET,
     key: process.env.FASTBOOT_MANIFEST
   },
   'gcloud-storage': {
     credentials: {
       private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/g, '\n'),
       client_email: process.env.GCS_CLIENT_EMAIL
     },
     projectId: process.env.GCS_PROJECT_ID,
     bucket: process.env.GCS_BUCKET
   },
   'gcs-index': {
     projectId: process.env.GCS_PROJECT_ID,
     bucket: process.env.GCS_BUCKET
   }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
