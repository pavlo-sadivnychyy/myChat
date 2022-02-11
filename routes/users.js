const { Router } = require('express');
const User = require("../models/user");
const router = Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/')
    },
    filename: function (req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb( null, true)
    }else{
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});




router.get('/all', async function (req, res, next) {

    // console.log('hello')
       User.find({}).then((result) => {
           res.status(200).json(result)
        }).catch((err) => console.log(err))
        // res.status(200).json(user)

});

router.get('/:id', async function (req, res, next) {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch (err){
        if(err) throw err
    }
});

router.post('/', upload.single('file'), async function (req, res,next) {

    console.log(req.file)

    try{
        const newUser = await new User(
            {
                name: req.body.name,
                surname: req.body.surname,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
                phone_number: req.body.phone_number,
                dob: req.body.dob,
                gender: req.body.gender,
                languages: req.body.languages,
                file: req.file.path
            }
        );
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch (err){
        if(err) throw err
    }

});

module.exports = router;
