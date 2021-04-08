const express = require('express');

const todoCtrl = require('../controller/controller')

const router = express.Router()  

router.post('/', todoCtrl.createItem)
router.get('/', todoCtrl.getTodos)

module.exports = router