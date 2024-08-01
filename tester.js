const { getAvailableItems } = require('./controllers/item/ItemsController');




// Example usage
getAvailableItems()
  .then(result => console.log('All available items', result[0].dataValues))
  .catch(error => console.error('Error items getting all items:', error));
