var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/artists', require('./artist/artistRoutes'));
router.use('/albums', require('./album/albumRoutes'));
router.use('/charts', require('./chart/chartRoutes'));
router.use('/categories', require('./chartCategory/chartCategoryRoutes'));
router.use('/users', require('./user/userRoutes'));

module.exports = router;
