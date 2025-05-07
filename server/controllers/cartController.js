const CartItem = require('../models/CartItem');

exports.getCart = async (req, res) => {
  const items = await CartItem.find({ user: req.user._id }).populate('product');
  res.json(items);
};

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  let item = await CartItem.findOne({ user: req.user._id, product: productId });
  if (item) {
    item.quantity += 1;
  } else {
    item = new CartItem({ user: req.user._id, product: productId });
  }
  await item.save();
  res.json(item);
};

exports.removeFromCart = async (req, res) => {
  await CartItem.findOneAndDelete({ user: req.user._id, product: req.params.id });
  res.json({ msg: 'Removed from cart' });
};
