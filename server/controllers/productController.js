const Product = require('../models/Product');

exports.getAll = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};


// Only the handler logic here, not the multer logic
exports.create = async (req, res) => {
    const { name, description, price } = req.body;

    const productData = {
        name,
        description,
        price,
        image: req.file? req.file.path : null, // Path to the uploaded file
    };
    

    try {
        const product = new Product(productData);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error saving product', error });
    }
};


exports.update = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
};

exports.remove = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted successfully' });
};
