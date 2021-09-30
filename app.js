require('dotenv').config();
const express = require('express');
const app = express();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products.router');
const port = process.env.PORT || 3000;

// * Middlewares
app.use(express.json());

// * Routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

// * Products Route
app.use('/api/v1/products', productsRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        // * Connect to database
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
