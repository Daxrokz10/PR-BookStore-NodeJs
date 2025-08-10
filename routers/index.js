const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/',bookController.home);

router.get('/view', bookController.viewBook);

router.get('/add',bookController.showAddBook);
router.post('/add',bookController.addBook);

router.get('/editBook/:id',bookController.showEditBook);
router.post('/editBook/:id',bookController.editBook);

router.get('/deleteBook/:id',bookController.deleteBook);

module.exports = router;
