const express = require('express');
const ExpressError = require('./expressError');
const router = new express.Router();
const items = require('./fakeDB');

router.get('/', (req, res, next) => {
    return res.json({items})
})

router.post('/', (req, res, next) => {
    try{
        if(!req.body.name){
            throw new ExpressError('Name is required!', 404);
        }
        const new_item = { 
            name: req.body.name, 
            price: req.body.price
        }
        items.push(new_item);
        return res.status(201).json({added:{new_item}})
    }
    catch(e){
        return next(e);
    }
})

router.get('/:name', (req, res, next) => {
    const item = items.find(item => item.name === req.params.name);
    if(item === undefined){
        throw new ExpressError('Item not found', 404);
    }
    res.json({item})
})

router.patch('/:name', (req, res, next) => {
    const item = items.find(item => item.name === req.params.name);
    if(item === undefined){
        throw new ExpressError('Item not found', 404);
    }
    item.name = req.body.name;
    item.price = req.body.price;
    res.json({updated:{item}})
})

router.delete('/:name', (req, res, next) => {
    const item = items.find(item => item.name === req.params.name);
    if(item === undefined){
        throw new ExpressError('Item not found', 404);
    }
    items.splice(item, 1);
    res.json({message: "item deleted"})
})

module.exports = router;
