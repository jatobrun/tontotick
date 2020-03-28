const {Router} = require('express');
const Photo = require('../models/photo');
const cloudinary = require('cloudinary');
const router = Router();
const fs = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router.get('/', async(req, res) =>{
    const photos = await Photo.find().sort({'_id':-1}).limit(30);
    console.log(photos);
    res.render('home', {photos});
});
router.get('/add', async(req, res) => {
    const photos = await Photo.find().sort({'_id':-1}).limit(20);

    res.render('add', {photos});
});
router.post('/add', async (req, res) =>{
    const {title, description, categoria} = req.body;
    console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto = new Photo({
        title,
        description,
        categoria,
        imageUrl : result.url,
        public_id : result.public_id
    });
    await newPhoto.save();
    await fs.unlink(req.file.path);
    res.redirect('/');
});
router.get('/momentos-felices', async(req, res) => {
    const photos = await Photo.find({categoria:'momentos-felices'}).sort({'_id':-1});
    res.render('momentos-felices', {photos});
});
router.get('/momentos-tristes', async(req, res) => {
    const photos = await Photo.find({categoria:'momentos-tristes'}).sort({'_id':-1});
    res.render('momentos-tristes', {photos});
});
router.get('/tonto', async(req, res) => {
    const photos = await Photo.find({categoria:'tonto-tick'}).sort({'_id':-1});
    res.render('tonto-tick', {photos});
});
router.get('/chupas', async(req, res) => {
    const photos = await Photo.find({categoria:'chupas'}).sort({'_id':-1});
    res.render('chupas', {photos});
});
router.get('/add/delete/:photo_id', async (req, res) =>{
    const {photo_id} = req.params;
    const photo = await Photo.findByIdAndDelete(photo_id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    res.redirect('/add');
});
module.exports = router;