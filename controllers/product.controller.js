const product = require('../models/product.model');

const getAllProductsStatic = async (req, res) => {
    const result = await product.find({
        page: 2,
    });
    res.status(200).json({ result, total: result.length });
};

const getAllProducts = async (req, res) => {
    const result = await product.find(req.query);
    res.status(200).json({ result, total: result.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
