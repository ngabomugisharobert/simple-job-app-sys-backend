

const uploadFileToS3 = async (file, url) => {
    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.name,
            Body: file.data,
            ACL: 'public-read'
        };

        const putObject = await s3.putObject(params).promise();
        return putObject;
    } catch (error) {
        throw error;
    }
};


// module.exports = upload