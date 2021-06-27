const fs = require('fs');
const Sauce = require('../models/Sauce');


// POST new sauce 
exports.createSauce = (req, res, next) => {
  // transforms the chain of characters JSON from the request into an object
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject, 
    imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
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
      const sauceObject = req.file ? 
        { ...JSON.parse(req.body.sauce), 
          imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}` 
        } : { 
          ...req.body 
        };
      if (req.file) {
        // to remove unnecesary old images
        fs.unlink('img/' + oldImg, () => {
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'The sauce was updated' }))
            .catch(error => res.status(400).json({ error }));
        });
      } else {
        // Only update sauce fields without touching the image 
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'The sauce was updated' }))
          .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};


// SET preference of sauce (Like or Not)
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
   .then(sauce => {
      switch ( req.body.like ) {

        case 1:
          // Adds like ONLY if the user did not liked previously the option
          if (!sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, 
              {$push: {usersLiked: req.body.userId}, $inc: {likes: 1}}
            )
              .then( () => res.status(200).json({ message: 'Preferences added' }))
              .catch(error => res.status(400).json({ error }));
          } 
          break;

        case 0:
          // Undo previous selection ( ex. if liked then it goes back to undefined preference )
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, 
              {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}}
            )
              .then( () => res.status(200).json({ message: 'No preference' }))
              .catch(error => res.status(400).json({ error }));
          } else {
            Sauce.updateOne({ _id: req.params.id }, 
              {$pull: {usersDisliked: req.body.userId}, $inc: {dislikes: -1}}
            )
              .then( () => res.status(200).json({ message: 'No preference' }))
              .catch(error => res.status(400).json({ error }));
          }
          break;
        
          case -1:
          // Adds dislike ONLY if the user did not disliked previously the option
          if (!sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, 
              {$push: {usersDisliked: req.body.userId}, $inc: {dislikes: 1}}
            )
              .then( () => res.status(200).json({ message: 'Disliked sauce' }))
              .catch(error => res.status(400).json({ error }));
          } 
          break;
      }
    })
   .catch(error => res.status(500).json({ error }));
};