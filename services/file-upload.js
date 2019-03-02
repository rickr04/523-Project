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

    downloadBucket: function(folderName, callback){
        s3.listObjects({Bucket: process.env.S3_BUCKET}, (err, data) => {
            if (err) {
                callback(err);
            } else  {
                console.log(data);
                let urls = [];
                data.Contents.forEach((file) => {
                    if (file.Key.startsWith(folderName+'/')) {
                        urls.push(s3.getSignedUrl('getObject', {
                            Bucket: process.env.S3_BUCKET, 
                            Key: file.Key, 
                            Expires:60
                        }));
                    }             
                }); 
                callback(err, urls);
            }
        });
    },

    upload: function(userid, filepath, name, callback) {
        fs.readFile(filepath, (err, fileData) => {
            s3.putObject({
            Body: fileData,
            Bucket: process.env.S3_BUCKET + '/' + userid,
            Key: name + Date.now().toString() +".pdf",
            }, (err, data) => {
                callback(err);
            });
        });
    }

    /*
    // Checks if bucket exists, if no than it creates the bucket
    checkBucket: function(userid, callback) {
        s3.headBucket({Bucket: userid}, (err) => {
            if (err.statusCode === 404) {
                s3.createBucket({Bucket: userid}, (err) => {
                    if (err) console.log(err, data);
                    else console.log(data);
                    callback();
                });
            } else {
                callback();
            }
        });
    }
    */
};
