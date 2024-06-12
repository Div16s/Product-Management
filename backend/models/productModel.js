const mongoose = require('mongoose');
const { z } = require('zod');

const productSchemaValidator = z.object({
    productId: z.string().min(1),
    name: z.string().min(1),
    price: z.number().min(1),
    featured: z.boolean(),
    rating: z.number().min(0).max(5),
    company: z.string().min(1),
});

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    company: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

productSchema.pre('save', async function(next) {
    try {
        productSchemaValidator.parse({
            productId: this.productId,
            name: this.name,
            price: this.price,
            featured: this.featured,
            rating: this.rating,
            company: this.company
        });
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Product', productSchema);
