var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/artists', require('./artist/artistRoutes'));

module.exports = router;
