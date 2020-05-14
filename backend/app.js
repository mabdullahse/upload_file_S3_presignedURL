const express = require('express');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// aws.config.update({
//     secretAccessKey: 'IAM User Secrect Access Key',
//     accessKeyId: 'IAM User Access Key',
//     region: 'Selected TIme Zone on S3 bucket',
// });

const s3 = new aws.S3();
const upload = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/octet-stream' || file.mimetype === 'video/mp4'
            || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'YOUR BUCKET NAME',
        key: function (req, file, cb) {
            req.file = Date.now() + file.originalname;
            cb(null, Date.now() + file.originalname);
        }
    })
});


app.post('/api/upload', upload.array('file', 1), (req, res) => {
    res.send({ file: req.file });
});



app.listen(5000, () => {
    console.log('Server listening on port 5000!');
});
