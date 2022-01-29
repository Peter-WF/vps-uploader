const express = require('express')
const app = express()
const port = require('./package.json').port
const fileUpload = require('express-fileupload')

app.use(fileUpload());

app.use(express.static('static'));
app.use('uploads', express.static('uploads'));

app.get('/ping', function(req, res) {
    res.send('pong');
});

app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    sampleFile = req.files.file;

    uploadPath = __dirname + '/uploads/' + sampleFile.name;

    sampleFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded to ' + uploadPath);
    });
});

app.get('/', (req, res) => {
    res.redirect('/vps-uploader/uploader.html')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
