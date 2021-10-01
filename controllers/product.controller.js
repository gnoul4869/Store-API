const product = require('../models/product.model');

const getAllProductsStatic = async (req, res) => {
    const result = await product.find({});
    res.status(200).json({ result, total: result.length });
};

const getAllProducts = async (req, res) => {
    res.status(200).json({ message: 'Products route' });
};

module.exports = { getAllProductsStatic, getAllProducts };
