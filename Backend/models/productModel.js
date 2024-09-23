const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productCode: {type: String, required: true},
    productName: {type: String, required: true},
    color: {type: String},
    stock: {type: Number},
    description: {type: String},
    category: {type: String},
    seller: {type: String},
    company: {type: String},
    createdDate: {type: Date},
    thumbnailURL: {type: String}
})

module.exports = mongoose.model('Product', productSchema);