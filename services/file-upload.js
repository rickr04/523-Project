const AWS = require('aws-sdk');
const fs = require('fs');
const editForm = require('../services/form-fill');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
});

const s3 = new AWS.S3();

module.exports = {
    download: function(parameters, reqbody, callback) {
        s3.getObject(parameters, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                fs.writeFile('./tempstore/temp.pdf', data.Body, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved');
                    editForm('./tempstore/temp.pdf', reqbody, callback);
                });
            }
        });
    },

    upload: function(filepath, name, callback) {
        fs.readFile(filepath, (err, fileData) => {
            s3.putObject({
            Body: fileData,
            Bucket: process.env.S3_BUCKET,
            Key: name + Date.now().toString() +".pdf",
            }, (err, data) => {
                if (err) console.log(err, err.stack);
            });
        });
        callback();
    }
};
