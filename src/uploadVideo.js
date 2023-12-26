const multer = require('multer')
const multerS3 = require('multer-s3')
var AWS = require('aws-sdk'); 

const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  })

function uploadFile(req, res, next) {
    // multer 설정
    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_S3_BUCKET_NAME,
            metadata: function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});
            },
            key: function (req, file, cb) { 
                cb(null, `${Date.now().toString()}_${file.originalname}`)
            },
            acl: 'public-read'
        }),
        limits: {
            // fieldSize: 1024 * 1024,
            fileSize: 1024 * 1024 * 10,
        }
    }).single('file') 
    
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
           console.log("error : ", err);
        } else if (err) {
            console.log("error2 : ", err);
        }
        // Everything went fine. 
        next()
    })
}

module.exports.uploadFile = uploadFile