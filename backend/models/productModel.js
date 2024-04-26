const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Enter product price"],
        maxLength: [8, "Price cannot exceed 8 digits"]
    },
    rating: {
        type: Number,
        default: 0,
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    category: {
        type: String,
        required: [true, "Enter product category"]
    },
    Stock: {
        type: Number,
        required: [true, "Enter product stock"],
        maxLength: [4, "Stock cannot exceed 4 digits"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            Comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    }

})

// const Product = mongoose.model('product',productSchema);
// module.exports = Product;

module.exports = mongoose.model('Product', productSchema);