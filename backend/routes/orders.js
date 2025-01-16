const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Get all orders for a user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Create a new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod, status, date, completionTime } = req.body;
    
    const order = new Order({
      user: req.user.id,
      items: items.map(item => ({
        product: item.product,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount,
      shippingAddress,
      paymentMethod,
      status,
      date,
      completionTime
    });

    const savedOrder = await order.save();
    
    // Populate any references if needed
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate('user', 'fullName email');
    
    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      message: 'Error creating order',
      error: error.message 
    });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update the complete order route
router.post('/complete', auth, async (req, res) => {
  try {
    const { cartItems, totalAmount, shippingAddress, paymentMethod } = req.body;
    
    const order = new Order({
      user: req.user.id,
      items: cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image
      })),
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'completed',
      date: new Date(),
      completionTime: new Date().toLocaleTimeString()
    });

    const savedOrder = await order.save();
    
    res.status(201).json({
      success: true,
      order: savedOrder,
      message: 'Order completed successfully'
    });
  } catch (error) {
    console.error('Error completing order:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error completing order',
      error: error.message 
    });
  }
});

module.exports = router; 