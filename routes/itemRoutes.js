const express = require('express');
const multer = require('multer');
const router = express.Router();

const {
  createItem,
  getAllItems,
  getAvailableItems,
  updateOrderItem,
  deleteItemByName,
  handleImageUpload
} = require('../controllers/ItemController'); 

const upload = multer({ storage: multer.memoryStorage() });

router.post('/items', createItem);
router.get('/items', getAllItems);
router.get('/items/available', getAvailableItems);
router.put('/items/update', updateOrderItem);
router.delete('/items/delete', deleteItemByName);
router.post('/items/upload-image', upload.single('image'), handleImageUpload);

module.exports = router;
