const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');



router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));


router.use('/api',require('./api'));

//for any further routes access from here
//router.use{'/routerName' , require('./routerfile')}
//After going to the router file call your controller in controllers file



module.exports = router;

//module.exports = router {is used to access this router from codieal/index.js}