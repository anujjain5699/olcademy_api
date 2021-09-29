const { Router } = require('express')
const router = Router();
const authController = require('../controllers/authController');
const { requireAuth,checkUser } = require('../middleware/authMiddleware');


//check user for every page
router.get('*',checkUser);

router.get('/',(req,res)=>{
    res.render('welcome')
})

router.get('/urls',requireAuth,(req,res)=>{
    res.render('urls')
})
router.post('/signup',authController.signup_post)
router.post('/login',authController.login_post)
router.get('/signup',authController.signup_get)
router.get('/login',authController.login_get)
router.get('/logout',authController.logout_get)

module.exports = router;