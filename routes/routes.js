//routes/routes.js
const express = require('express');
const router = express.Router();
const Defi = require('../models/Defi');
const { verifyToken} = require('../middlewares/authMiddleware.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');   


/* 
                         Pour les routes, j'ai mit des message en couleur qui sont visible dans la console 
                        ça permet de mieux voir quand une action est effectuée
*/


//*************************************************************************************************** Route pour récupérer un défi aléatoire
router.get('/defis/random', async (req, res) => {
  try {
    const defi = await Defi.aggregate([{ $sample: { size: 1 } }]);
    const message = '\x1b[33mRecuperation de un seul defis\x1b[0m';
    console.log(message);
    res.json(defi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//*************************************************************************************************** Route pour récupérer plusieurs défis aléatoires avec une limite de 100
router.get('/defis/random/:count', async (req, res) => {
    let count = parseInt(req.params.count);
    
    // Vérifier si le nombre de défis demandés dépasse 100
    if (count > 100) {
        return res.status(400).json({ message: 'La limite de défis par requête est de 100' });
    }
  
    try {
        const defis = await Defi.aggregate([{ $sample: { size: count } }]);
        const message = '\x1b[33mRecuperation de plusieurs defis\x1b[0m';
        console.log(message);
        res.json(defis);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
//***************************************************************************************************Route pour ajouter un défis (authentification requise)
router.post('/AjoutDefis', verifyToken, async (req, res) => {
    try {
      const { titre, description } = req.body;
      const nouveauDefi = new Defi({ titre, description });
      await nouveauDefi.save();
      console.log('\x1b[1m', 'Défi ajouté avec succès', '\x1b[0m');
      res.status(201).json(nouveauDefi);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


//ICI je fait deux route possible pour suprimer un défi, soit par son ID soit par son titre

//*************************************************************************************************** Route pour supprimer un défi par son ID (authentification requise)
router.delete('/DeletDefis/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        //ICI je trouve le défi par son titre et je le supprime grâce à la fonction findOneAndDelete
        const defi = await Defi.findByIdAndDelete(id);
        if (!defi) {
            return res.status(404).json({ message: 'Défi non trouvé' });
        }
        console.log('\x1b[1m', 'Défi supprimé avec succès', '\x1b[0m');
        res.status(200).json({ message: 'Défi supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log('\x1b[1m', 'Probleme avec la supression', '\x1b[0m');
    }
});

//*************************************************************************************************** Route pour supprimer un défi par son titre (authentification requise)
router.delete('/DeletDefis/titre/:titre', verifyToken, async (req, res) => {
    const titre = req.params.titre;
    try {
        //ICI je trouve le défi par son titre et je le supprime grâce à la fonction findOneAndDelete
        const defi = await Defi.findOneAndDelete({ titre: titre });
        if (!defi) {
            return res.status(404).json({ message: 'Défi non trouvé' });
        }
        console.log('\x1b[1m', 'Défi supprimé avec succès', '\x1b[0m');
        res.status(200).json({ message: 'Défi supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//*************************************************************************************************** */ Route pour modifier un défi spécifique (authentification requise)
router.put('/ModificationDefis/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { titre, description } = req.body;
    try {
        const defi = await Defi.findByIdAndUpdate(id, { titre, description }, { new: true });
        if (!defi) {
            return res.status(404).json({ message: 'Défi non trouvé' });
        }
        console.log('\x1b[1m', 'Défi modifié avec succès', '\x1b[0m');
        res.status(200).json(defi);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//*************************************************************************************************** Route pour récupérer tous les défis (authentification requise)
router.get('/defis', verifyToken, async (req, res) => {
    try {
        const defis = await Defi.find();
        const message = '\x1b[33mRecuperation de tous les defis\x1b[0m';
        console.log(message);
        res.json(defis);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
