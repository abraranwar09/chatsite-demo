const express = require('express');
const router = express.Router();
const Component = require('../models/componentModel');

// Save component
router.post('/api/components', async (req, res) => {
    try {
        const { component_name, component_html } = req.body;
        const newComponent = new Component({ component_name, component_html });
        await newComponent.save();
        res.status(201).send('Component saved successfully');
    } catch (error) {
        res.status(500).send('Error saving component');
    }
});

// Retrieve components
router.get('/api/components', async (req, res) => {
    try {
        const components = await Component.find();
        res.status(200).json(components);
    } catch (error) {
        res.status(500).send('Error retrieving components');
    }
});

// Retrieve component by ID
router.get('/api/components/:id', async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);
        if (!component) {
            return res.status(404).send('Component not found');
        }
        res.status(200).json(component);
    } catch (error) {
        res.status(500).send('Error retrieving component');
    }
});

module.exports = router;

