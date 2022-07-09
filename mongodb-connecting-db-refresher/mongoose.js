const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v4byc.mongodb.net/product_test?retryWrites=true&w=majority`
).then(() => {
    console.log('Connected to database!')
}).catch(() => {
    console.log('Connected failed!')
});

const createProduct = async (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });

    const result = await createdProduct.save();

    res.json(result);
};

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec();

    res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
