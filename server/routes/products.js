const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {
  getAll, create, update, remove
} = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// Configure multer storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a unique name to avoid overwriting files
  }
});

// Create a multer instance
const upload = multer({ storage: storage });

router.get('/', auth, getAll);
router.post('/',upload.single('image'), auth, admin, create);
router.put('/:id', auth, admin, update);
router.delete('/:id', auth, admin, remove);

module.exports = router;
