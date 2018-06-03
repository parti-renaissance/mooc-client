/* eslint-env node */

const FastBootAppServer       = require('fastboot-app-server');
const GCloudStorageDownloader = require('fastboot-gcloud-storage-downloader');
const GCloudStorageNotifier   = require('fastboot-gcloud-storage-notifier');

require('dotenv').config();


let downloader = new GCloudStorageDownloader({
  bucket: process.env.GCS_BUCKET,
  key: process.env.FASTBOOT_MANIFEST,
});

let notifier = new GCloudStorageNotifier({
  bucket: process.env.GCS_BUCKET,
  key: process.env.FASTBOOT_MANIFEST,
});


let server = new FastBootAppServer({
  beforeMiddleware(app) {
    app.use((req, res, next) => {
      if (req.headers['user-agent'].indexOf('GoogleHC') >= 0) {
        return res.sendStatus(200)
      }
      return next();
    });
  },
  downloader,
  notifier,
  gzip: true, // Optional - Enables gzip compression.
  // host: '0.0.0.0', // Optional - Sets the host the server listens on.
  // port: 3000, // Optional - Sets the port the server listens on (defaults to the PORT env var or 3000).
  chunkedResponse: true // Optional - Opt-in to chunked transfer encoding, transferring the head, body and potential shoeboxes in separate chunks. Chunked transfer encoding should have a positive effect in particular when the app transfers a lot of data in the shoebox.
});

server.start();
