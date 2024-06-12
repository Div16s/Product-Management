const Product = require('../models/productModel');
const User = require('../models/userModel');

const getProducts = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email});
        const products = await Product.find({user: user._id});
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ 
            err: error.message 
        });
        console.log("Error in getProducts: ", error.message);
    }
}

const getFeaturedProducts = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        const products = await Product.find({ 
            user: user._id, 
            featured: true 
        });

        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in getFeaturedProducts: ", error.message);
    }
}

const addProduct = async (req, res) => {
    const {email, productId, name, price, featured, rating, company} = req.body;
    try {
        const user = await User.findOne({ email });
        console.log(user);
        const product = new Product({
            user: user._id,
            productId,
            name,
            price,
            featured,
            rating,
            company
        });

        const savedProduct = await product.save();

        res.status(200).json({
            message: "Product added successfully.",
        });
    } catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in addProduct: ", error.message);
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOneAndDelete({_id: id});
        res.status(200).json({
            message: 'Product deleted successfully.'
        });
    }
    catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in deleteProduct: ", error.message);
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({_id: id});
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in getProduct: ", error.message);
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productId, name, price, featured, rating, company } = req.body;
    try {
        const product = await Product.findOne({_id: id});
        product.productId = productId;
        product.name = name;
        product.price = price;
        product.featured = featured;
        product.rating = rating;
        product.company = company;

        await product.save();

        res.status(200).json({
            message: 'Product updated successfully.'
        });
    }
    catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in updateProduct: ", error.message);
    }
}

const getProductsWithSpecificRating = async (req, res) => {
    const { email, rating } = req.params;
    
    try {
        const user = await User.findOne({ email });
        const products = await Product.find({
            user: user._id,
            rating: { $gt: rating }
        });

        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in getProductsWithSpecificRating: ", error.message);
    }
}

const getProductsWithSpecificPrice = async (req, res) => {
    const { email, price } = req.params;
    console.log(price);
    try {
        const user = await User.findOne({ email });
        const products = await Product.find({
            user: user._id,
            price: { 
                $lt: price 
            }
        });
        console.log(products);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in getProductsWithSpecificPrice: ", error.message);
    }
}



module.exports = { getProducts, getFeaturedProducts, addProduct, deleteProduct, getProduct, updateProduct, getProductsWithSpecificRating, getProductsWithSpecificPrice };