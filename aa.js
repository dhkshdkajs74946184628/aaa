const express = require('express');
const crypto= require('crypto');
const pdfkit = require('pdfkit');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('./pdfs'));


app.post('/',(req,res)=>{
    const text = req.body.text;
    const tok = crypto.randomBytes(5).toString('hex');
    const a = new pdfkit();
    a.pipe(fs.createWriteStream('./pdfs/'+tok+'.pdf'));
    a.text(text);
    a.end();
    res.json({link:(tok+'.pdf')});
    
})


app.listen(1234);