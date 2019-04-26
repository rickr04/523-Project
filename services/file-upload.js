/**
 * This module is for handling our S3 buckets.
 * @module
 * @requires {@link https://www.npmjs.com/package/aws-sdk}
 */
const AWS = require('aws-sdk');
const formFill = require('../services/form-fill');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const s3 = new AWS.S3();

module.exports = {
  /**
   * Function that allows us to edit forms. {@link module:services/form-fill~editForm} is called at the end, passing on the callback.
   * @param {JSON} parameters - S3 parameters with the PDF we need to edit
   * @param {JSON} reqbody - reqbody.answers needs to equal the JSON you want to edit the PDF with.
   * @param {callback} callback
   */
  editForm: function(parameters, reqbody, callback) {
    s3.getObject(parameters, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        formFill.editForm(data, reqbody.answers, callback);
      }
    });
  },

  /**
   * @callback module:services/file-upload~getFolderKeysCallback
   * @param {error} err
   * @param {array} keys - Array of all relevant S3 keys
   */

  /**
   * Takes in a folder name, usually a user ID, and returns all keys within the folder.
   * @param {string} folderName - What high-level folder the form is stored in, typically a userID. Can be null and will simply look in the root.
   * @param {string} template - SAQ template ID where files are typically stored
   * @param {module:services/file-upload~getFolderKeysCallback} callback
   */
  getFolderKeys: function(folderName, template, callback) {
    s3.listObjects({
      Bucket: process.env.S3_BUCKET
    }, (err, data) => {
      if (err) {
        callback(err);
      } else if (folderName != null) {
        let keys = [];
        data.Contents.forEach((file) => {
          if (file.Key.startsWith(folderName + '/' + template + '/')) keys.push(file.Key);
        });
        callback(err, keys);
      } else {
        let keys = [];
        data.Contents.forEach((file) => {
          keys.push(file.Key);
        });
        callback(err, keys);
      }
    });
  },
  /**
   * @callback module:services/file-upload~downloadFileCallback
   * @param {error} err
   * @param {buffer} data - File data
   */

  /**
   * Downloads an S3 file given the relevant key.
   * @param {string} objectKey - S3 key of file you want to download
   * @param {module:services/file-upload~downloadFileCallback} callback
   */
  downloadFile: function(objectKey, callback) {
    s3.getObject({
      Bucket: process.env.S3_BUCKET,
      Key: objectKey
    }, (err, data) => {
      callback(err, data);
    });
  },

  /**
   * @callback module:services/file-upload~uploadCallback
   * @param {error} err
   * @param {data} data - Data returned by S3 on upload
   */

  /**
   * Upload a file to S3.
   * @param {string} userid - User ID, which represents the folder the file is stored in
   * @param {buffer} file - Data buffer of the file you want to upload
   * @param {string} name - The name you want to save the file as
   * @param {module:services/file-upload~uploadCallback} callback
   */
  upload: function(userid, file, name, callback) {
    if (userid != null) {
      s3.putObject({
        Body: file,
        Bucket: process.env.S3_BUCKET + '/' + userid + '/' + name,
        Key: Date.now().toString() + ".pdf",
      }, (err, data) => {
        callback(err, data);
      });
    } else {
      s3.putObject({
        Body: file,
        Bucket: process.env.S3_BUCKET,
        Key: name + ".pdf",
      }, (err, data) => {
        callback(err, data);
      });
    }
  }
};
