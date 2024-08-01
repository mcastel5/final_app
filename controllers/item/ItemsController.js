const { uploadImageToS3 } = require('./uploadImageS3');
const Item  = require('../../models/Item');

async function createItem(user_data) {
  try {
  
    const newItem = await Item.create(user_data);
    console.log('Item created successfully!');
    return newItem;
  } catch (error) {
    console.error(error);
    return 'Error creating item.';
  }
}

async function getAllItems() {
  try {
    const items = await Item.findAll(); 
    console.log('All items retrieved successfully!');
    return items;
  } catch (error) {
    console.error('Error retrieving all items:', error);
    return 'Error retrieving all items.';
  }
}

async function getAvailableItems() {
  try {
    const availableItems = await Item.findAll({
      where: { available: true } 
    });
    console.log('Available items retrieved successfully!');
    return availableItems;
  } catch (error) {
    console.error('Error retrieving available items:', error);
    return 'Error retrieving available items.';
  }
}


async function updateOrderItem(orderItemId, updateData) {
  try {

    const [updated] = await Item.update(updateData, {
      where: { order_item_id: orderItemId },
    });

    if (updated) {
      console.log('Order item updated successfully!');


      const updatedItem = await Item.findByPk(orderItemId);
      return updatedItem;
    } else {
      console.log('Order item not found!');
      return 'Order item not found.';
    }
  } catch (error) {
    console.error('Error updating order item:', error);
    return 'Error updating order item.';
  }
}


async function deleteItemByName(itemName) {
  try {
    const items = await getAllItems();

    const itemToDelete = items.find(item => item.item_name === itemName);

    if (itemToDelete) {

      const result = await deleteOrderItem(itemToDelete.order_item_id);
      console.log(result);
      return result;
    } else {
      console.log(`Item with name "${itemName}" not found!`);
      return `Item with name "${itemName}" not found!`;
    }
  } catch (error) {
    console.error('Error deleting item by name:', error);
    return 'Error deleting item by name.';
  }
}



async function handleImageUpload(imageFile) {
  try {

    const imageUrl = await uploadImageToS3(imageFile.buffer, imageFile.originalname, imageFile.mimetype);
    
    return {
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: imageUrl
    };
  } catch (error) {
    console.error('Error in handleImageUpload:', error);
    return {
      success: false,
      message: 'Failed to upload image',
      error: error.message
    };
  }
}

module.exports = { createItem, getAllItems, getAvailableItems, updateOrderItem, deleteItemByName, handleImageUpload };