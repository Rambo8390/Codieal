const express = require('express');

const router = express.Router();

const usersController = require('../controllers/user_controller');

router.get('/profile' , usersController.profile);

module.exports = router;

//module.exports = router {is used to access this router from routes/index.js}