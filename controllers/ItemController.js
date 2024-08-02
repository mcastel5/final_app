const Item = require('../models/Item');
const { uploadImageToS3 } = require('./uploadImageS3');

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    console.log('Item created successfully!');
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating item.' });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    console.log('All items retrieved successfully!');
    res.status(200).json(items);

  } catch (error) {
    console.error('Error retrieving all items:', error);
    res.status(500).json({ error: 'Error retrieving all items.' });
  }
};

// Get available items
exports.getAvailableItems = async (req, res) => {
  try {
    const availableItems = await Item.findAll({ where: { available: true } });
    console.log('Available items retrieved successfully!');
    res.status(200).json(availableItems);
  } catch (error) {
    console.error('Error getting available items:', error);
    res.status(500).json({ error: 'Error getting available items.' });
  }
};

// Update an order item
exports.updateOrderItem = async (req, res) => {
  try {
    const { orderItemId, updateData } = req.body;
    const [updated] = await Item.update(updateData, { where: { order_item_id: orderItemId } });

    if (updated) {
      console.log('Order item updated successfully!');
      const updatedItem = await Item.findByPk(orderItemId);
      res.status(200).json(updatedItem);
    } else {
      console.log('Order item not found!');
      res.status(404).json({ message: 'Order item not found.' });
    }
  } catch (error) {
    console.error('Error updating order item:', error);
    res.status(500).json({ error: 'Error updating order item.' });
  }
};

// Delete an item by name
exports.deleteItemByName = async (req, res) => {
  try {
    const { itemName } = req.body;
    const items = await Item.findAll();
    const itemToDelete = items.find(item => item.item_name === itemName);

    if (itemToDelete) {
      const result = await Item.destroy({ where: { order_item_id: itemToDelete.order_item_id } });
      console.log('Item deleted successfully!');
      res.status(200).json({ message: 'Item deleted successfully!' });
    } else {
      console.log(`Item with name "${itemName}" not found!`);
      res.status(404).json({ message: `Item with name "${itemName}" not found!` });
    }
  } catch (error) {
    console.error('Error deleting item by name:', error);
    res.status(500).json({ error: 'Error deleting item by name.' });
  }
};

// Handle image upload
exports.handleImageUpload = async (req, res) => {
  try {
    const imageFile = req.file;
    const imageUrl = await uploadImageToS3(imageFile.buffer, imageFile.originalname, imageFile.mimetype);
    
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('Error in handleImageUpload:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    });
  }
};
