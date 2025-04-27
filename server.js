
const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET_PASSWORD = 'ema123';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/upload.html', (req, res) => {
  res.sendFile(__dirname + '/upload.html');
});

app.get('/uploads', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) {
      return res.status(500).send('Error reading uploads folder');
    }
    res.json(files);
  });
});

app.post('/upload', upload.single('image'), (req, res) => {
  const password = req.body.password;
  if (password !== SECRET_PASSWORD) {
    fs.unlinkSync(req.file.path); // delete uploaded file
    return res.status(403).send('Incorrect password.');
  }
  res.send('Upload successful! 🦋');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
