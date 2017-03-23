var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/artists', require('./artist/artistRoutes'));
router.use('/users', require('./user/userRoutes'));

module.exports = router;
