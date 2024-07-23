const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../../controllers/authController');
const auth = require('../../middlewares/auth');


router.post(
    '/register',
    authController.register
);
    
router.post(
    '/login',
    authController.login
);

router.post(
    '/change-password',
    [
        check('currentPassword', 'Current password is required').not().isEmpty(),
        check('newPassword', 'New password must be 5 or more characters').isLength({ min: 5 }),
    ],
    auth,
    authController.changePassword
);

router.get('/', auth, authController.getUserDetails);
router.post('/logout', auth, authController.logout);
module.exports = router;
    





