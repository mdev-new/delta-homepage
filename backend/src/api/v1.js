const express = require('express');
const passport = require('passport')
const router = express.Router();

const account = require('./v1/account')
const helpdesk = require('./v1/helpdesk')
const social = require('./v1/social')

router.use('/account', account)
router.use('/social', social)
router.use('/helpdesk', helpdesk)

module.exports = router;
