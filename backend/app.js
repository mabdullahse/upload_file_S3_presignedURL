const express = require('express');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

aws.config.update({
    //     secretAccessKey: 'IAM User Secrect Access Key',
    //     accessKeyId: 'IAM User Access Key',
    //     region: 'Selected TIme Zone on S3 bucket',
    useAccelerateEndpoint: true,
    endpoint: 'jspicload123.s3-accelerate.amazonaws.com',
    signatureVersion: 'v4',
});

const s3 = new aws.S3();

app.get('/generatepresignedurl', function (req, res) {
    var fileurls = [];

    const params = {
        Bucket: 'YOUR BUCKET NAME',
        Key: req.query.fileName,
        Expires: 60 * 60,
        ACL: 'public-read',
        ContentType: req.query.fileType
    };

    s3.getSignedUrl('putObject', params, function async(err, url) {
        if (err) {
            res.json({
                success: false, message: 'Pre- Signed URL error', urls: fileurls
            });
        }
        else {
            fileurls[0] = url;
            res.json({ success: true, message: 'AWS SDK S3 Pre- signed urls generated successfully', urls: fileurls });
        }
    });
});

app.listen(5000, () => {
    console.log('Server listening on port 5000!');
});
