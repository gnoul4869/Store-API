require('dotenv').config();

const connectDB = require('./db/connect');
const product = require('./models/product.model');
const jsonProducts = require('./products.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await product.deleteMany();
        await product.create(jsonProducts);
        console.log('Successful');
    } catch (error) {
        console.log(error);
    }
};

start();
