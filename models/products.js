const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        item: String,
        price: String,
        quantity: String,
        image: {type: String, default: 'https://www.iphonetechnicians.com/wp-content/uploads/2020/10/image-coming-soon-placeholder.png'}
    }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product