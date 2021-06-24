const Sauce = require('../models/Sauce');

// POST new sauce 
exports.createSauce = (req, res, next) => {
  // transforms the chain of characters JSON from the request into an object
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject, 
    imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
  });
  sauce.save()
    .then(res.status(201).json({ message: "New sauce created"}))
    .catch(error => res.status(400).json({ error }));
};

// GET all sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};