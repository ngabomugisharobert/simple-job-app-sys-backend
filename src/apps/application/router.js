const express = require('express')
const router = express.Router();
const Application = require('./controller');
const fileUpload = require('express-fileupload');
const publicFilesUploader = require('../../utils/PublicFilesUploaded')




router.post('/', Application.create);

router.get('/all', Application.getAll);

router.get('/:id', Application.getById);

router.put('/:id', Application.updateStatus);

router.get('/test/s3url', Application.generateS3URL);

// router.post('/upload', function (req, res) {
//     let sampleFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     sampleFile = req.files.file;
//     uploadPath = __dirname + '/uploads/' + sampleFile.name;

//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(uploadPath, function (err) {
//         if (err)
//             return res.status(500).send(err);

//         res.send('File uploaded!');
//     });
// });




module.exports = router;