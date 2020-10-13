const { Router } = require('express');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const customer = require('../models/customer');



// ROUTE FOR ADD DATA
router.post('/add', (req, res) => {

    const { name, mob, uid } = req.body;
    const newCustomer = new customer({
        name,
        mob,
        uid
    });

    newCustomer.save((err) => {
        if (err) {
            console.log("Data not saved. Something went wrong !" + err);
        } else {
            console.log("Data Inserted !");
            res.redirect('/');
        }
    })

});


// ROUTE FRO DATA FETCHING
router.get('/', (req, res) => {
    customer.find((err,data)=>{
        res.render('home',{myData:data})
    }).catch(err=>{
        console.log("Something went wrong.");
    })
});

// ROUTE FOR DATA RENDERING IN EDIT PAGE
router.get('/edit/:id', (req, res) => {
    customer.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,data)=>{
        if(err){
            console.log('Data not available. Something went wrong !');
        }else{
            res.render('edit',{customer:data})
        }
    });
});

router.post('/edit/:id',(req,res)=>{
    
    customer.findByIdAndUpdate({_id:req.params.id},req.body,(err, data)=>{
        if(err){
            console.log('Data not updated. Something went wrong !');
        }else{
            res.redirect('/');
        }
    })
});

router.get('/delete/:id',(req,res)=>{
    customer.findByIdAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            console.log("Something went wrong.");
        }else{
            console.log("Data deleted successfully !");
            res.redirect('/');
        }
    })
});



router.get('/upload',(req,res)=>{
    res.render('upload');
})


const Storage = multer.diskStorage({
    destination:"./public/uploads",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage:Storage
}).single('fileToUpload');

router.post('/upload',upload,(req,res)=>{
    var success = req.file.fieldname + "uploaded successfully";
    res.render('upload',{title: "Upload file", success:success});
})

module.exports = router;