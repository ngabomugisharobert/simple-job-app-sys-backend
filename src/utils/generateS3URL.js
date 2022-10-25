const AWS = require('aws-sdk');

const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });

AWS.config.credentials = credentials;

// const bucket = process.env.BUCKET_NAME;
// const bucket = "c4d44a2c-64ed-4c0d-b09b-82d00673fc97"
const bucket = "03384b55-8f94-4882-9218-aa8faa19467e-bk-techhouse"
const s3_link_expiry = process.env.S3_LINK_EXPIRY;
const s3 = new AWS.S3({
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    params: { Bucket: process.env.AWS_BUCKET_NAME },
})

exports.generateS3URL = async (key) => {
    const url = await s3.getSignedUrl('putObject', {
        Bucket: bucket,
        Key: key,
        Expires: Number(s3_link_expiry)
    })
    return url;
}