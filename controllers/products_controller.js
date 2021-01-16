const express = require('express')
const products = express.Router()

const Product = require('../models/products.js')

products.get('/', (req, res) => {
    Product.find({}, (err, foundProducts) => {
        res.json(foundProducts)
    })
})

//to hit this route must type localhost:3000/products/setup/seed in browser
products.get('/setup/seed', (req, res) => {
    Product.create(
        [
            {
                item: 'Hammer',
                price: '$20',
                quantity: '10',
                image: 'https://www.kleintools.com/sites/all/product_assets/catalog_imagery/klein/j2000-9ne_alt3.jpg'
            },
            {
                item: 'Hammer Drill',
                price: '$120',
                quantity: '10',
                image: 'https://products.blains.com/600/113/1137923.jpg'
            },
            {
                item: 'Impact Drill',
                price: '$120',
                quantity: '10',
                image: 'https://images.homedepot-static.com/productImages/59c79b7e-9a3b-434e-88b6-1ce916ad8bea/svn/milwaukee-impact-drivers-2853-20-64_1000.jpg'
            },
            {
                item: 'Hackzall',
                price: '$130',
                quantity: '10',
                image: 'https://images-na.ssl-images-amazon.com/images/I/71w3cIOcy9L._AC_SL1500_.jpg'
            },
            {
                item: 'Hilti Gun',
                price: '$220',
                quantity: '10',
                image: 'https://s3.amazonaws.com/chaparralmaterialscomfiles/product/MD-hilti_373103_DX351_ME.jpg'
            },
            {
                item: 'Fish Tape',
                price: '$50',
                quantity: '10',
                image: 'https://products.blains.com/600/131/1312914.jpg'
            },
        ],
        (err, createdProduct) => {
            Product.find({}, (err, foundProducts) => {
                res.redirect('/products')
            })
            
        }
    )
})

products.post('/', (req, res) => {
    Product.create(req.body, (err, createdProduct) => {
        Product.find({}, (err, foundProducts) => {
            res.json(foundProducts)
        })
    })
})

products.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedProduct) => {
        if(err) {
            res.send(err)
        }else{
            Product.find({}, (err, foundProducts) => {
                res.json(foundProducts)
            })
        }
    })
})

products.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
        Product.find({}, (err, foundProducts) => {
            res.json(foundProducts)
        })
    })
})

module.exports = products