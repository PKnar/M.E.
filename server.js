'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan')
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs=require('fs')




let images = fs.readdirSync('./uploads')

// const storage = multer.diskStorage({
//     destination:'./uploads/',
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname);
//     }
// })

// const upload = multer({
//     storage:storage,
//     fileFilter:(req,file,cb)=>{
//         checkFileType(file,cb)
//     }
// }).array('fileToUpload',20);

// function checkFileType(file,cb){
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
//     const mimetype = filetypes.test(file.mimetype)
//      if(mimetype && extname){
//          return cb(null,true);
//      }else{
//          cb('Error: Upload Images Only!')
//      }
// }
//app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(fileUpload())


app.get('/',(req,res)=>{
    res.send('Welcome to backend')
})

 app.get('/images',(req,res)=>{
    res.send({images})
})

app.post('/upload',(req,res)=>{
  let uploadedFile = req.files.file;
  const fileName=uploadedFile.name;
  uploadedFile.mv(`${__dirname}/uploads/${fileName}`),

  (err)=>{
      if(err) return res.status(500).send(err)
  }

  res.json({file:`/uploads/${fileName}`})
//  upload(req,res,(err)=>{
//      if(err){
//          res.send(err)
//      }else {
//      if(!req.files){
//       res.send('No file has been selected')
//       }else {
//           res.send({
//               message:'File Uploaded!' })
//       }
//      }
//  })
})

 let PORT =process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Connected' + PORT )
})