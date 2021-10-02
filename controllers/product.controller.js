const product = require('../models/product.model');

const getAllProductsStatic = async (req, res) => {
    const result = await product.find({}).sort('price');
    res.status(200).json({ result, total: result.length });
};

const getAllProducts = async (req, res) => {
    const { name, isFeatured, company, sort } = req.query;
    const queryObject = {};

    if (isFeatured) {
        queryObject.isFeatured = isFeatured;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    console.log(queryObject);
    let result = product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = await result.sort(sortList);
    } else {
        result = await result.sort('price');
    }
    res.status(200).json({ total: result.length, result });
};

module.exports = { getAllProductsStatic, getAllProducts };
