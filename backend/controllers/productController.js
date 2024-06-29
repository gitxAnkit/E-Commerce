const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

// create Product -- Admin
const handleCreateProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


const handleGetAllProducts = catchAsyncErrors(async (req, res) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})
const handleGetProductById = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product NOT found.", 404));
    }

    res.status(200).json({
        success: true,
        product,
    })

})
// Update product by Id --Admin
const handleUpdateProduct = catchAsyncErrors(async (req, res) => {
    let product = Product.find(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})
const handleDeleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})

module.exports = {
    handleGetAllProducts,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetProductById
}