const product = require('../models/product.model');

const getAllProductsStatic = async (req, res) => {
    const result = await product.find({ price: { $gte: 50 } });
    res.status(200).json({ result, total: result.length });
};

const getAllProducts = async (req, res) => {
    const { name, isFeatured, company, sort, select, numericFilters } =
        req.query;
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

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    let result = product.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    if (select) {
        const selectList = select.split(',').join(' ');
        result = result.select(selectList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const products = await result.limit(limit).skip(skip);

    res.status(200).json({ total: products.length, products });
};

module.exports = { getAllProductsStatic, getAllProducts };
