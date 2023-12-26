const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const {uploadFile} = require('./src/uploadVideo')
const dotenv = require('dotenv')
dotenv.config()

app.get('/', (req, res) => {
  return res.status(200).send('hello uploader!')
});
  
app.post('/upload', uploadFile, (req, res) => {
    // console.log("req : ", req);
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    res.send('File uploaded!');
  });

server.listen(3000, () => {
  console.log('Server is running on port 3000'); 
});
