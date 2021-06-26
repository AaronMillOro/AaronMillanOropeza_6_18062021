const fs = require('fs');
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

// GET one sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

// DELETE one sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      // removal of file from local disk
      const filename = sauce.imageUrl.split('/img/')[1];
      fs.unlink('img/' + filename, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then( () => res.status(200).json({ message: 'Sauce was deleted' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Modify one sauce
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(oldSauce => {
      const oldImg = oldSauce.imageUrl.split('/img/')[1];
      const sauceObject = { 
        ...JSON.parse(req.body.sauce), 
        imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
        } // : { req.body };
        // to remove unnecesary images
        fs.unlink('img/' + oldImg, () => {
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'The sauce was updated' }))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};