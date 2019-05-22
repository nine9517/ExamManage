const express = require('express');
const router = express.Router();

router.route('/mongo').get(function(req, res) {
    return res.redirect('http://mongoexammanage.9develop.com');
});
module.exports = router;