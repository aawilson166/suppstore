const express = require('express')
const products = express.Router()

const Product = require('../models/products.js')

products.get('/', (req, res) => {
    Product.find({}, (err, foundProducts) => {
        res.json(foundProducts)
    })
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