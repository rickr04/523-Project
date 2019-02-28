const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const editForm = require('../services/form-fill');

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const s3 = new AWS.S3();

module.exports = {
    upload: multer({
            storage: multerS3({
                s3: s3,
                bucket: S3_BUCKET,
                key: (req, file, callback) => {
                    callback(null, name + Date.now().toString() + ".pdf");
                }
            })
        }),

    download: function(parameters, reqbody, callback) {
        s3.getObject(parameters, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                fs.writeFile('./tmp/temp.pdf', data.Body, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved');
                    editForm('./tmp/temp.pdf', reqbody);
                });
            }
        });
        callback();
    },

    upload2: function(filepath) {
        s3.putObject({
            Body: fs.readFile(filepath),
            Bucket: S3_BUCKET,
            Key: name+ Date.now().toString() +".pdf"
        }, (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log(data);
        })
    }
};
