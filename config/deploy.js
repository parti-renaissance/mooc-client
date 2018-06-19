/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {
      environment: 'production'
    },
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
  }

  return ENV;
};
